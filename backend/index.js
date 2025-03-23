import express from 'express';
import connectDB from './database/db.js';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import EventRouter from './routes/eventRoutes.js';
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
app.use('/api/v1/events', EventRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});