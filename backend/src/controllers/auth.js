import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils.js";

//signup controller
export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "Please fill in all the fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    // check if the user already exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    //than create a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, fullName, password: hashedPassword });

    if (newUser) {
      // here we need to generate a token        //here is to generate the token JWT - using function to make it more reausable to send cookies to the response
      generateToken(newUser._id, res);
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

  //check if the users exist in database
  try {
    const user = await User.findOne({ email });
    //if there is no user, return error
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    //if the user existed, bcrypt.compare a method that compares the password from req.body with the hashed password
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    //generate token
    generateToken(user._id, res)
    res.status(200).json({
      _id:user._id,
      fullName:user.email,
      profilePic:user.profilePic,
    })
  } catch (error) {
    console.log("Error in login controller", error.message)
  }s
};

//logout controller just clear the cookie
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
  } catch (error) {
    console.log("Error in logout controller", error.message);
  }
};
