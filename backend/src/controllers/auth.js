import User from "../models/user-model"
import bcrypt from "bcrypt"

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exists" })
        const salt = await bcrypt.genSalt(10)
        // hashedPassword is not readable for the db
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ email, fullName, password: hashedPassword })


        if(newUser) {
            // here we need to generate a token
        } else {
            res.status(400).json({message:'Invalid User Data'})
        }



    } catch (error) {
    }
}

export const login = (req, res) => {
    res.send("login controller route")
}

export const logout = (req, res) => {
    res.send("logout controller route")
}