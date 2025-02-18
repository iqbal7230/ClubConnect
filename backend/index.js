import express from 'express';
import authRouter from './routes/auth.js';
import connectToDatabase from './database/db.js ';
const app = express();

app.use('/api/v1/auth', authRouter);
//call the connectToDatabase function
connectToDatabase();

app.get('/', (req, res) => {    
    res.send('On Home page');
    });
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    });