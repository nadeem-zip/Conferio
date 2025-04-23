import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import { Meeting } from "../models/meeting.model.js";

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
        const existingUser= await User.findOne({username:username});
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
const getUserHistory = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token: token });
        const meetings = await Meeting.find({ user_id: user.username })
        res.json(meetings)
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}

const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history" })
    } catch (e) {
        res.json({ message: `Something went wrong ${e}` })
    }
}
export {login,register,getUserHistory,addToHistory};