import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import {Request,Response, NextFunction} from "express";

export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        throw new ApiError(401,"Unauthorized");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        req.user = decoded;
        next();

    } catch (error) {
        throw new ApiError(401,"Invalid Token");
    }
};