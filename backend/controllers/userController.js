import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";
import mongoose from "mongoose";
export async function register(req, res){
    try {
        let { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
        }
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Try different email",
                success: false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        password=hashedPassword;
        await new userModel({
            username,
            email,
            password
        }).save();
        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}
export async function login(req, res){
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
        }
        let checkUser = await userModel.findOne({ email });
        if (!checkUser) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const check = await bcrypt.compare(password, checkUser.password);
        if (!check) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        };
        
        const token = generateToken(checkUser)
           res.cookie("auth_token", token, { 
            httpOnly: true,
            secure:true, 
            sameSite: 'lax',
            maxAge: 1 * 24 * 60 * 60 * 1000 })
            .json({
            message: `Welcome back ${checkUser.username}`,
            success: true,
            checkUser:checkUser
        });

    } catch (error) {
        console.log(error);
    }
};
export async function logout(req,res){
    try {
        res.clearCookie("auth_token",{ 
            httpOnly: true,
            secure:true, 
            sameSite: 'lax'
            }).json({
            message: 'Logged out successfully.',
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};
export async function isLoggedIn(req,res){
    res.send("logged In");
}
export async function getProfile(req, res) {
    try {
        const {id}  = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID format",
                success: false,
            });
        }
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        res.status(200).json({
            user: user,
            success: true,
        });
    } 
    catch (error) {
        console.error(error);
    }
};
export async function editProfile(req, res){
    try{
        const {id}=req.params;
        const {bio,gender } = req.body;
        const profilePicture = req.file
        if(profilePicture) await generateUrl(req)

        const user = await userModel.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        };
        const updatedData=await userModel.findByIdAndUpdate(id,{
            bio,gender,profilePicture
        },{
            new:true
        }
       )
        return res.status(200).json({
            message: 'Profile updated.',
            success: true,
            updatedData
        });

    } catch (error) {
        console.log(error);
    }  
}
export async function getSuggestedUsers(req, res){
    try {
        const suggestedUsers = await userModel.find({ _id: { $ne: req.user._id } }).select("-password");
        if (suggestedUsers.length===0) {
            return res.status(400).json({
                message: 'Currently do not have any users',
            })
        };
        return res.status(200).json({
            success: true,
            users: suggestedUsers
        })
    } catch (error) {
        console.log(error);
    }
};
export async function followOrUnfollow(req, res){
    try {
        const followerId = req.user._id; //followers(user)
        const followingId = req.params.id; // followings(follow request)
        if (followerId.equals(followingId)) {
            return res.status(400).json({
                message: 'You cannot follow or unfollow yourself',
                success: false
            });
        }

        const user = await userModel.findById(followerId);
        const targetUser = await userModel.findById(followingId);

        if (!user || !targetUser) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
        const isFollowing = user.following.find((id)=>id.equals(followingId));
        if (isFollowing) {
            // unfollow logic
            await userModel.findByIdAndUpdate(followerId,{$pull:
                {following:followingId},
            },
            {new:true})
            await userModel.findByIdAndUpdate(
                followerId,
                {
                    $pull: { followers: followingId }
                },
                { new: true }
            );
            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        } else {
            // follow logic
            await userModel.findByIdAndUpdate(followerId,{$push:
                {following:followingId},
            },
            {new:true})
            await userModel.findByIdAndUpdate(
                followerId,
                {
                    $push: { followers: followingId }
                },
                { new: true }
            );
            return res.status(200).json({ message: 'followed successfully', success: true });
        }
    } catch (error) {
        console.log(error);
    }
}