import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getMessage, sendMessage } from "../controllers/messageController.js";
const messageRoute=express.Router();
messageRoute.post("/sendMessage/:id",authMiddleware,sendMessage)
messageRoute.get("/getmessage/:id",authMiddleware,getMessage)
export default messageRoute