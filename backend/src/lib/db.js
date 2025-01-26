import mongoose, { mongo } from "mongoose"

export const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongo db connected`)
    }
    catch(error){
        console.log("MongoDb CONNECTION Error", error)
    }
};