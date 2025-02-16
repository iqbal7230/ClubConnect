import express from 'express';
import authRouter from './routes/auth.js';
const app = express();

app.use('/api/v1/auth', authRouter);


app.get('/', (req, res) => {    
    res.send('On Home page');
    });
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    });