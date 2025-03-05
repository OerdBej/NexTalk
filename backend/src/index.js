import express from 'express'
const app = express () 
import authRoutes from "./routes/auth.js"


app.use('/api/auth', authRoutes)

app.listen(5001, () => {
    console.log("Yaaaay the server is running on port5001")
})
