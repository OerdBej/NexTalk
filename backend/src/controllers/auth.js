import User from "../models/user-model";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
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
      // here we need to generate a token
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
    //if the user is created successfully, than send a response
    if(newUser) {
        //here is to generate the token JWT - using function to make it more reausable to send cookies to the response
        generateToken(newUser._id, res)
        await newUser.save()
        res.status(201).json({
          _id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName
        })

    } else {
        res.status(400).json({message:'Invalid user data'})
    }

  } catch (error) {
    console.log('error in signup controller', error.message)
    res.status(500).json({message: error.message})
  }
};

export const login = (req, res) => {
  res.send("login controller route");
};

export const logout = (req, res) => {
  res.send("logout controller route");
};
