import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";
import { User } from "../models/user.js";

export const adminOnly=TryCatch(async(req,res,next)=>{
    const {id}=req.query; 
    if(!id) return next(new ErrorHandler("First Login",401));

    const user= await User.findById(id);
    if(!user) return next(new ErrorHandler("Fake ID",401));
    if(user.role!="admin") return next(new ErrorHandler("You are not admin",401));

    next();

})