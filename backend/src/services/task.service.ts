import { skip } from "node:test";
import prisma from "../DB/db";
import ApiError from "../utils/ApiError";

export const createTask = async(userId:number,title:string, description:string)=>{
    return await prisma.task.create({
        data:{title,description,userId}
    });
};

export const getTasks = async(userId:number,page:number,take:number,status?:string,search?:string)=>{
    return await prisma.task.findMany({
        where:{
            userId,
            status:status?status === "true" :undefined,
            title:search ? {contains:search,mode:"insenitive"}:undefined
        },
        skip:(page-1)*take,
        take
    });
};

export const updateTask = async(id:number,userId:number,data:any)=>{
    const task = await prisma.task.findUnique({
        where:{id}
    });

    if(!task || task.userId !== userId){
        throw new ApiError(404,"task not found");
    }
    return await prisma.task.update({
        where:{id},
        data
    });
};

export const deleteTask = async(id:number, userId:number)=>{
   const task = await prisma.task.findUnique({
    where:{id}
   });

   if(!task || task.userId !== userId){
    throw new ApiError(404,"Task not found");
   }

   return await prisma.task.delete({
    where:{id}
   });
}