import cloudinary from "../lib/cloudinary.js";
import { generateTokens } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs"

export const signup = async(req,res) => {
    const {fullName,email,password} = req.body
    try {
        if (!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        //hash password
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"})
        }
        
        const user = await User.findOne({email})

        if (user) return res.status(400).json({message: "User already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password: hashed
        })

        if (newUser){
            generateTokens(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }else{
            res.status(400).json({message: "Invalid User data"})
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Something has broken"});
        
    };
};

export const login = async (req,res) => {
const { email, password} = req.body
try {
    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({message: "Invalid credentials"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid credentials"})
    }

    generateTokens(user._id,res)

    res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,

    })
} catch (error) {
    console.log("error in login controller", error.message)
    return res.status(400).json({message: "Internal error"})
}
    //res.send("login route");
};

export const logout = (req,res) => {
  try{  
    res.cookie("jwt","",{ maxAge:0 })
    res.status(200).json({message:"Logout out succesfully"})
    //res.send("logout route");
  } catch(error){
    console.log("Error in logout controller", error.message);
    return res.status(500).json({message: "Internal server error"});
  }
};

export const updateProfile = async(req,res) =>{
 try {
    const {profilePic} = req.body;
    const userId = req.user._id;

    if(!profilePic){
        res.status(400).json({message:"Profile pic is required"})
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new: true})

    res.status(200).json(updatedUser)
 } catch (error) {
    console.log("error in update profile",error)
    res.status(500).json({message:"Internal sever error"});
 }   
};


export const checkAuth = (req,res) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message:"Internal server error "});
    }
};



