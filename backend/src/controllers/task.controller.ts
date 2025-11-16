import { asyncHandler } from "../utils/asyncHandler";
import {Request,Response} from "express";
import ApiResponse from "../utils/ApiResponse";
import { createTask, getTasks, updateTask,deleteTask, getTaskById } from "../services/task.service";

export const create = asyncHandler(async(req:Request,res:Response)=>{
    const {title,description}= req.body;

    const task = await createTask(req.user.id,title,description);

    return res.status(201).json(new ApiResponse(201,task, "Task Created Successfully"));
});

export const list = asyncHandler(async(req:Request,res:Response)=>{
    const {page=1,take=10,status,search}= req.query;
    const tasks = await getTasks(
        req.user.id,
        Number(page),
        Number(take),
        status as string,
        search as string
    );

    return res.status(200).json(new ApiResponse(200, tasks,"Task fetched"));
});

export const update = asyncHandler(async(req:Request,res:Response)=>{
    const updated = await updateTask(Number(req.params.id),req.user.id, req.body);

    return res.status(200).json(new ApiResponse(200,updated,"Task updated"));
});

export const remove = asyncHandler(async (req:Request,res:Response) => {
  await deleteTask(Number(req.params.id), req.user.id);

  return res.status(200).json(new ApiResponse(200, null, "Task deleted"));
});
export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const task = await getTaskById(Number(req.params.id), req.user.id);

  return res.status(200).json(new ApiResponse(200, task, "Task fetched"));
});


export const toggle = asyncHandler(async (req:Request,res:Response) => {
  const updated = await updateTask(Number(req.params.id), req.user.id, {
    status: req.body.status
  });

  return res.status(200).json(new ApiResponse(200, updated, "Task updated"));
});