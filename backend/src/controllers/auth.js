import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils.js";
import cloudinary from "../../lib/claudinary.js";

//signup controller
export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;

  //check if the fields are filled
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "Please fill in all the fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    //regex user email
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    // check if the user already exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    //than create a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create a new user in the database
    const newUser = new User({ email, fullName, password: hashedPassword });


    if (newUser) {
      // Generate JWT token function and set it in cookie for authentication and authorization
      generateToken(newUser._id, res);
      //save it to the db
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;




  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
  } catch (error) {
    console.log("Error in logout controller", error.message);
  }
};

export const updateProfile = async (req,res) => {

  try {
    //we have access to the user id from the authentication middleware protectedRoute
    const userId = req.user._id;

    if(!userId) {
      return res.status(400).json({message: "User ID not found"})
    }

    //if provided than update the profile pic to cloudinary


  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
  }


}