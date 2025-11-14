import prisma from "../DB/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

export const registerService = async (name:String, email:String, password:String)=>{
    const exist = await prisma.user.findUnique({
        where: {email}
    });

    if(exist){
        throw new ApiError(400,"User already exist");
    }

    const hashed = await bcrypt.hash(password,10);
    
    const user = await prisma.user.create({
        data:{name,email,password:hashed}
    });

    return user;

};

export const loginService = async (email:String, password:String)=>{
    const user = await prisma.user.findUnique({
        where:{email}
    });
    if(!user){
        throw new ApiError(400,"Invalid email");
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new ApiError(400,"Invalid password");
    }

    const accessToken = jwt.sign(
   { id:user.id, email:user.email},
   process.env.ACCESS_TOKEN_SECRET!,
   {expiresIn: "15m"}
    );
  
    const refreshToken = jwt.sign(
        {id:user.id},
        process.env.REFRESH_TOKEN_SECRET!,
        {expiresIn: "7d"}
    );

    return {user,accessToken,refreshToken};
};