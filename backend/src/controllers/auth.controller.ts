import { asyncHandler } from "../utils/asyncHandler";
import {Request,Response} from "express";
import {JwtPayload} from "jsonwebtoken"
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { registerService, loginService } from "../services/auth.service";

import jwt from "jsonwebtoken";

export const register = asyncHandler(async(req:Request,res:Response)=>{
    const {name,email,password}= req.body;

    if(!name || !email || !password){
        throw new ApiError(400,"All fields are required"); 
    }

    const user = await registerService(name,email,password);

    return res.status(201).json(new ApiResponse(201,user, 'User registered'));

});

export const login = asyncHandler(async (req:Request,res:Response)=>{
    const {email,password}=req.body;
    if(!email || !password){
        throw new ApiError(400,"Invalid credentials");
    }
    const {user,accessToken, refreshToken}= await loginService(email,password);

    return res.status(200).json(new ApiResponse(200, {user,accessToken,refreshToken},"Login Successful"));

});

export const refresh = asyncHandler(async (req:Request,res:Response)=>{
    const {refreshToken} = req.body;
    if(!refreshToken){
        throw new ApiError(401,"Refresh token required");
    }

    const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET!)as JwtPayload;

    const {exp,iat, ...payload } = decoded;

    const newAccessToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET!,
        {expiresIn: "15m"}
    )

    return res.status(200).json(
        new ApiResponse(200,{accessToken:newAccessToken},"Token Refreshed"));
});

export const logout = asyncHandler(async(req:Request,res:Response)=>{
    return res.status(200).json(new ApiResponse(200,null,"Logout Success"));
})
