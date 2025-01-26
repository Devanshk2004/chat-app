import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import { connect } from "mongoose";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import cloudinary from "./lib/cloudinary.js";
import { app,server} from "./lib/socket.js";


dotenv.config()
//const app = express();


const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
}
))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(PORT, () => {
     console.log("Server is running on PORT:" + PORT)
     connectDB()
})


