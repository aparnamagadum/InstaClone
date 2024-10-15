import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";
import { generateUrl } from "../utils/generateUrl.js";
import commentModel from "../models/commentModel.js";
import mongoose from "mongoose";
export async function addNewPost(req, res){
    try {
        const { caption } = req.body;
        let image = req.file;
        const author = req.user._id;
        if(image) image=await generateUrl(req)
        const post=await new postModel({caption,image,author}).save();
        const user = await userModel.findById(author);
        if (user) {
            user.post.push(post._id);
            await user.save();
        }
        return res.status(201).json({
            message: 'New post added',
            post,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}
export async function getAllPost(req, res){
    try {
        const posts = await postModel.find()
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};
export async function getUserPost(req, res){
    try {
        const authorId = req.user._id;
       const posts = await postModel.find({ author: authorId })
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export async function likePost(req, res){
    try {
        const likeUser= req.user._id;
        const postId = req.params.id; 
        const post = await postModel.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        // like logic started
        await post.updateOne({ $addToSet: { likes: likeUser } });
        await post.save();

        // implement socket io for real time notification
        const user = await userModel.findById(likeUser).select('username profilePicture');
         
        const postUserId = post.author.toString();
        if(postUserId !== likeUser){
            // emit a notification event
            const notification = {
                type:'like',
                userId:likeUser,
                userDetails:user,
                postId,
                message:'Your post was liked'
            }
        }

        return res.status(200).json({message:'Post liked', success:true});
    } catch (error) {
      console.log(error)
    }
}
export const dislikePost = async (req, res) => {
    try {
        const likeUser = req.id;
        const postId = req.params.id;
        const post = await postModel.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        // like logic started
        await post.updateOne({ $pull: { likes: likeUser } });
        await post.save();

        // implement socket io for real time notification
        const user = await userModel.findById(likeUser).select('username profilePicture');
        const postOwnerId = post.author.toString();
        if(postOwnerId !== likeUser){
            // emit a notification event
            const notification = {
                type:'dislike',
                userId:likeUser,
                userDetails:user,
                postId,
                message:'Your post was liked'
            }
        }
        return res.status(200).json({message:'Post disliked', success:true});
    } catch (error) {

    }
}
export async function addComment(req,res){
    try {
        const post= req.params.id;
        const author= req.user._id;
        const {text} = req.body;
        const Post = await postModel.findById(post);
         if(!Post) return res.status(400).json({message:'post not found', success:false});
        if(!text) return res.status(400).json({message:'text is required', success:false});
        const comment=await new commentModel({text,post,author}).save();
        Post.comments.push(comment._id);
        await Post.save();
        return res.status(201).json({
            message:'Comment Added',
            comment,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
};
export async function getCommentsOfPost(req,res){
    try {
        const postId = req.params.id;
        const comments = await commentModel.find({post:postId});
        if(!comments) return res.status(404).json({message:'No comments found for this post', success:false});
        return res.status(200).json({success:true,comments});
    } catch (error) {
        console.log(error);
    }
}
export async function deletePost(req, res) {
    try {
        const { id } = req.params; 
        const authorId = req.user._id; 

        // Validate post ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Post ID', success: false });
        }

        // Find the post by ID
        const post = await postModel.findById(id);
        //console.log(post);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }

        //console.log(post.author);

        // Check if the logged-in user is the owner of the post
        if (!post.author.equals(authorId)) {
            return res.status(403).json({ message: 'Unauthorized', success: false });
        }

        // Delete the post
        await postModel.findByIdAndDelete(id);

        // Remove the post ID from the user's posts array
        const user = await userModel.findById(authorId);
        if (user) {
            user.post = user.post.filter(postId => postId.toString() !== id);
            await user.save();
        }

        // If you have a Comment model and want to delete associated comments, uncomment the next line
        // await Comment.deleteMany({ post: id });

        return res.status(200).json({
            success: true,
            message: 'Post deleted',
        });
    } catch (error) {
        console.error('Error in deletePost:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
}
