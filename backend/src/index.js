import express from 'express'
const app = express () 
import authRoutes from "./routes/auth.js"
import dotenv from "dotenv"
import {connectDB} from "../lib/db.js"


//config env variables in order to use them in the app
dotenv.config()

const PORT = process.env.PORT || 5001


app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Yaaaay the server is running on port ${PORT}`)
    connectDB()
})
