import express from 'express'
import connectToDB from './database/connectToDB.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.middleware.js';
import userRouter from './routes/user.route.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Welcome to authentication system');
});

app.listen(port, () => {
    console.log(`App running on - http://localhost:${port}`);
    connectToDB();
});