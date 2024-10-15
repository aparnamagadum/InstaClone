import express from "express";
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, isLoggedIn, login, logout, register} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
const userRouter=express.Router();
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",logout)
userRouter.get("/isLoggedIn",authMiddleware,isLoggedIn)
userRouter.get("/profile/:id",authMiddleware,getProfile)
userRouter.patch("/profile/:id",authMiddleware,upload.single("profile"),editProfile)
userRouter.get("/suggested",authMiddleware,getSuggestedUsers);
userRouter.post("/followOrUnfollow/:id",authMiddleware,followOrUnfollow)
export default userRouter