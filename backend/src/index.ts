import cors from "cors";
import app from "./app";
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["https://task-management-mocha-mu.vercel.app/"],
  credentials: true,
}));

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`); 
});

