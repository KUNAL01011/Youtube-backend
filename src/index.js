import dotenv from "dotenv";
import express from 'express';
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.on("error",(error) => {
        console.log("When we try to listen the error accored : ", error);
        throw error
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(` Server is running at port : ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDb connection failed ",error);
})