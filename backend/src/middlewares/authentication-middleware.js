import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

export const protectRouter = async (req,res,next) => {
  try{
    const token = req.cookies.jwt;
    if(!token){
      return res.status(401).json({message:"Unauthorized - No token provided"})
    }

  }

}