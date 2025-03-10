import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../lib/db.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Load env variables before using them
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// Middleware setup
app.use(express.json());

//allow cookies to be parse the cookies = to grab values from the cookies
app.use(cookieParser());



// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Yaaaay the server is running on port ${PORT}`);
  connectDB();
});
