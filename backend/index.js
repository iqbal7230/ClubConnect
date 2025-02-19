import express from 'express';
import connectDB from './database/db.js';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';


import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);

// Error handling middleware
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});