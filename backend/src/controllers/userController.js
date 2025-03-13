import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from 'crypto';


const login= async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"User not found"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid password"});
        }
        const token=crypto.randomBytes(20).toString("hex");
        user.token=token;
        user.save();
        return res.status(httpStatus.OK).json({token:token});
    }
    catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR
        ).json({message:err});
    }
}

const  register=async(req,res)=>{
    let {name,username,password}=req.body;
    try{
        const existingUser=await await User.findOne({username:username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message:"User already exists"});
        }
        const hassedPassword=await bcrypt.hash(password,10);
        const newUser = new User({
            name,
            username,
            password:hassedPassword
        })
        await newUser.save();
        return res.status(httpStatus.CREATED).json({message:"User registered successfully"});
    }
    catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:err});
    }
};
export {login,register};