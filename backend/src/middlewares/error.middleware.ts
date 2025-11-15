import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const status = err.statusCode || 500;
  const msg = err.message || "Internal Server Error";

  return res.status(status).json(new ApiResponse(status, null, msg));
};
