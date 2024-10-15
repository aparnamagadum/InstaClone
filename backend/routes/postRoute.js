import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addComment, addNewPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from "../controllers/postController.js";
const postRouter=express.Router();
postRouter.post("/addPost",authMiddleware,addNewPost);
postRouter.get("/",authMiddleware,getAllPost);
postRouter.get("/getUserPost",authMiddleware,getUserPost);
postRouter.delete("/delete/:id",authMiddleware,deletePost)
postRouter.post("/addComment/:id",authMiddleware,addComment)
postRouter.get("/getCommentsofPost/:id",authMiddleware,getCommentsOfPost)
postRouter.get("/:id/like",authMiddleware, likePost);
postRouter.get("/:id/dislike",authMiddleware, dislikePost);
export default postRouter