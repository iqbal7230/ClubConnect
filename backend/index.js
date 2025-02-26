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
<<<<<<< HEAD
app.use('/api/v1/events', EventRouter);


=======
app.use('/api/v1/events', eventRouter);


// Error handling middleware
// app.use(errorHandler);

>>>>>>> fbfe50b069082278794bf8297262e156a5c43976
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});