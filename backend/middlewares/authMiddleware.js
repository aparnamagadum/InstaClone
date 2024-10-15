import jwt from 'jsonwebtoken';
import "dotenv/config"
import userModel from '../models/userModel.js';
export async function authMiddleware(req,res,next){
    try{
       const {auth_token}=req.cookies;
       //console.log(auth_token);
       if(!auth_token) return res.send("please login");
       const decodeToken=jwt.verify(auth_token,process.env.SECRET)
       //console.log(decodeToken);
       const loggedIn=await userModel.findById(decodeToken.userId);
       if(!loggedIn) return res.send("please login");
       req.user=loggedIn;
       next();
    }
    catch(err){
        console.log(err)
    }
}