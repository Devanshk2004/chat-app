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
import next from "next";
import path from "path";

dotenv.config()
//const app = express();


const PORT = process.env.PORT
const __dirname = path.resolve(); // Fix variable name

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
}
))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: path.join(__dirname, "../frontend") });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.all("*", (req, res) => {
    return handle(req, res);
});

server.listen(PORT, () => {
     console.log("Server is running on PORT:" + PORT)
     connectDB()
   })

})
