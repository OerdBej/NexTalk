import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

//next function to call the next middleware
export const protectRouter = async (req,res,next) => {
  try {
    const token = req.cookies.jwt;
    //if no token provided throw an error
    if(!token){
      return res.status(401).json({message:"Unauthorized - No token provided"})
    }

    //verify token if is valid = grab the token from the cookie using cookie parser and configured in the index.js. allow to parse cookie
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded) {
      return res.status(401).json({message: 'Invalid token'})
    }

    //find the user by the id in the decoded token
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({message: 'User not found'});
    }
    //user is found, so we can pass the user to the next middleware updateProfile
    req.user = user;
    next();
  } catch(error) {
    return res.status(401).json({message: 'Invalid token'})
    res.status(500).json({message: "error.message"} )
  }
}
