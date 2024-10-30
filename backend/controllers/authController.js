import User from '../models/auth.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async(req, res)=>{
    const {name, email, password, role} = req.body;
    try{

        if(!name || !email || !password || !role){
            return res.status(400).json({message: "All fields are required"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User Already exists"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({name, email, password: hashedPassword, role});
        res.status(201).json({message: "User created Successfully", newUser});

    }catch(err){
        res.status(500).json({message: "Something went wrong"});
    }
}

export const signin = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) res.status(404).json({message: "User not found"});

        // validate password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        // generate jwtToken
        const token = jwt.sign({
            id: user._id, 
            role: user.role,
        }, process.env.JWT_KEY, {expiresIn: "10h"});

        // set token in cookie
        res.cookie('token',token,{
            httpOnly: true
        }).status(200).json({message: "Loggedin successsfully", token, role: user.role});
    }catch(err){
        res.status(500).json({message:  "Something went wrong"});
    }
}

export const signout = async(req, res)=>{
    res.clearCookie('token');
    res.status(200).json({message: 'Logged out successfully'});
}