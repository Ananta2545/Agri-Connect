import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import validateTokenRoutes from './routes/validateTokenRoutes.js'
import recommendationRoute from './routes/recommendationRoute.js';
import taskRoute from './routes/taskRoute.js';
import recordRoute from './routes/recordRoute.js';
import cropRoute from './routes/cropRoutes.js';
import irrigationRoute from './routes/irrigationRoute.js';
import farmingNewsRoute from './routes/farmingNewsRoute.js';
import notificationRoutes from './routes/notificationsRoutes.js';

const app = express();

app.use(cookieParser());
dotenv.config()
const PORT = process.env.PORT || 8000;

//configure cors
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))

// middle ware to parse json
app.use(express.json());

// Making the route
app.use("/api/auth", authRoute);
app.use("/api/auth", validateTokenRoutes);
app.use('/api', recommendationRoute)
app.use('/api', taskRoute)
app.use('/api/records',recordRoute)
app.use("/api/crops", cropRoute);
app.use("/api/irrigation", irrigationRoute);
app.use('/api/news', farmingNewsRoute)
app.use('/api',notificationRoutes)


const connection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    }catch(err){
        console.log(err);
    }
}

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connection();
})

