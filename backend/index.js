import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import userRouter from "./routes/userRoute.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import postRouter from "./routes/postRoute.js";
import messageRoute from "./routes/messageRoute.js";
const app=express();
const port=process.env.PORT;
const uri=process.env.uri
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser());
mongoose.connect(uri)
        .then(()=>app.listen(port,()=>console.log(`server running on port ${port}`)))
        .catch((err)=>console.log(err))
app.use("/api/user",userRouter)
app.use("/api/user/post",postRouter)
app.use("/api/user/message",messageRoute)