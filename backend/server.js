import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import validateTokenRoutes from './routes/validateTokenRoutes.js';
import recommendationRoute from './routes/recommendationRoute.js';
import taskRoute from './routes/taskRoute.js';
import recordRoute from './routes/recordRoute.js';
import cropRoute from './routes/cropRoutes.js';
import irrigationRoute from './routes/irrigationRoute.js';
import farmingNewsRoute from './routes/farmingNewsRoute.js';
import notificationRoutes from './routes/notificationsRoutes.js';
import blogRecommendationRoute from './routes/blogRecommendationsRoute.js';
import expertDetailsRoutes from './routes/expertDetailsRoute.js';
import farmerDetailsRoutes from './routes/farmerDetailsRoute.js';
import postRoutes from './routes/postRoutes.js';
import getExpertsRoutes from './routes/getExpertsRoute.js';
import { Server } from 'socket.io';
import socketManager from './socket/socketManager.js'; // Import socket manager
import appointmentRoutes from './routes/appointmentRoutes.js';
import http from 'http';
import videoCallRoutes from './routes/videoCallRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Set up middleware
app.use(cookieParser());
app.use(cors({
    // origin: 'https://weather-b6e3.vercel.app',
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

// Socket.IO setup with CORS
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        // origin: 'https://weather-b6e3.vercel.app',  // Adjust this as needed for your frontend URL
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ["GET", "POST"]
    },
});

// Pass `io` instance to `socketManager` and attach it to the app for access in other routes
app.set('socketio', io);
socketManager(io);  // Initialize socket functionality for both video calls and appointments

// Route setup
app.use('/api/video-call', videoCallRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoute);
app.use('/api/auth', validateTokenRoutes);
app.use('/api', recommendationRoute);
app.use('/api', taskRoute);
app.use('/api/records', recordRoute);
app.use('/api/crops', cropRoute);
app.use('/api/irrigation', irrigationRoute);
app.use('/api/news', farmingNewsRoute);
app.use('/api', notificationRoutes);
app.use('/api', blogRecommendationRoute);
app.use('/api/expert-details', expertDetailsRoutes);
app.use('/api/farmer-details', farmerDetailsRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', getExpertsRoutes);

// Connect to MongoDB
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    } catch (err) {
        console.log("Database connection error:", err);
    }
};

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connection();
});
