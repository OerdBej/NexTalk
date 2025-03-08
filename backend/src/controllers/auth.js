import User from "../models/user-model"

export const signup = async (req,res) => {
    const {email, fullName, password} = req.body
    try {
        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"})
        }
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "User already exists"})
    } catch (error) {
    }
 }

export const login = (req,res) => {
    res.send("login controller route")
}

export const logout = (req,res) => {
    res.send("logout controller route")
}