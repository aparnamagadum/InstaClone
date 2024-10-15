import cloudinary from "cloudinary"
import "dotenv/config"
export async function generateUrl(req){
    try{
     cloudinary.config({
        cloud_name: process.env.my_cloud_name, 
        api_key: process.env.my_key, 
        api_secret:process.env.my_secret
     })
     const data=await cloudinary.uploader.upload(req.file.path,{
        folder:"Instagram"
     })
     return data.secure_url;
    }
    catch(err)
    {
        console.log(err);
    }
}