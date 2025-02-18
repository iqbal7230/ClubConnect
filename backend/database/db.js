import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_URL) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log(`Connected to database in ${process.env.PORT} mode`);
  } catch (error) {
    console.error('Error connecting to database: ', error);

    process.exit(1);
  }
}

export default connectToDatabase;