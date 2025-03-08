import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../lib/db.js';
import authRoutes from './routes/auth.js';

// Load env variables before using them
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// Middleware to parse JSON bodies in the request
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Yaaaay the server is running on port ${PORT}`);
  connectDB();
});
