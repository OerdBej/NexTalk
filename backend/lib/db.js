//connect to the database in order to use it in the app with mongoose
import dotenv from 'dotenv'
import mongoose from "mongoose"

// Load environment variables
dotenv.config()

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION)
        console.log("Connected to the database")
    } catch (error) {
        console.log("Error connecting to the database", error)
    }
}
