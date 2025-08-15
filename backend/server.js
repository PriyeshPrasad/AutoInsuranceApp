import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import policyRouter from "./routes/policyRoutes.js";


const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:5173']

// DB connection
connectDB();


// adding middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: allowedOrigins
}));
//app.use(express.urlencoded({ extended: true })); 

// API Endpoints
app.get('/', (req,res) => {
    res.send('API Working');
})
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/policy', policyRouter);

app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`);
});
