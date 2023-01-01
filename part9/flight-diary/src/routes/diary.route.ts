
import express from 'express';
import diariesServices from "../services/diary.services";
// import { DiaryEntry } from './../types/index';

const diaryRouter = express.Router();


diaryRouter.get("/",(_request,response)=>{
    const diaries = diariesServices.getNonSensitiveEntries();
    response.status(200).json(diaries);
});


diaryRouter.post("/",(_request,response)=>{
    response.status(201).send("Creating a new diary");
});


export default diaryRouter;