import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import taskRouter from "./routes/task.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth',authRouter);
app.use('/tasks',taskRouter);

app.use(errorMiddleware);
export default app;