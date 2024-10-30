import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js';

const app = express();

dotenv.config()
const PORT = process.env.PORT || 8000;

// middle ware to parse json
app.use(express.json());

// Making the route
app.use("/api/auth", authRoute);
// app.use("/api/expertAuth", expertAuth);

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

