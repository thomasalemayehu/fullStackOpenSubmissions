import express from "express";
import diaryRouter from "./routes/diary.route";

// 
const PORT = 3000;


// create app
const app = express();


// use body middleware
app.use(express.json());

// routers
app.use("/api/v1/diaries",diaryRouter);


app.listen(PORT,()=>{
    console.log("Server is live");
});