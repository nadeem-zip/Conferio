import express from 'express';
import {createServer} from "node:http";
import { connectToSocket } from './controllers/socketManager.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const server=createServer(app);
const io=connectToSocket(server);
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({extended:true}));
app.set("port",process.env.PORT || 8000);
app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
});

const start=async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL)
    server.listen(app.get("port"),()=>{
        console.log("Listening on port 8080");
    })
}
catch(err){
    console.log("failed to connect to mongo",err);
}
}
start();