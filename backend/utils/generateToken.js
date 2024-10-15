import jwt from "jsonwebtoken"
export function generateToken(user){
    return jwt.sign({
        userId:user._id,
        userEmail:user.email,
        isVarified:true,
    },
    process.env.SECRET,
    {
        expiresIn:"1hr"
    }
)
}