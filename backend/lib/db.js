//connect to the database in order to use it in the app with mongoose
import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to the database")
    } catch (error) {
        console.log("Error connecting to the database", error)
    }
}
