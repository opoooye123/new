//Packages
import path from 'path';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import categoryRoute from './utils/categoryRoute.js'
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
//utils
import connectDb from './config/db.js';

dotenv.config()
const port = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
    origin: [
        'http://localhost:5173',                   // local dev
        'https://ds-6ufs.onrender.com'            // your deployed frontend
    ],
    credentials: true,
}));



app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use('/api/users', userRouter)
app.use('/api/category', categoryRoute)
app.listen(port, () => {
    console.log(`Listening to to backend at port: ${port}`)
})
