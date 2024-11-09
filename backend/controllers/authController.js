import User from '../models/auth.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    console.log(req.body);
    const { name, email, password, role } = req.body;
    try {
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({ name, email, password: hashedPassword, role });
        return res.status(201).json({ message: "User created successfully", newUser });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const signin = async (req, res) => {
    console.log(req.body);
    const { email, password, role } = req.body;
    try {
        console.log(role);
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        if(role !== user.role) return res.status(404).json({message: "Invalid Credentials"});
        // Validate password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "10h" }
        );

        // Set token in cookie
        return res
            .cookie('token', token, { httpOnly: true })
            .status(200)
            .json({ message: "Logged in successfully", token, role: user.role });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const signout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
};


export const getUserProfile = async(req,res)=>{
    try{
        

        const user = await User.findById(req.userId).select('-password')
        if (!user) return res.status(404).json({message:"User not found"})
        res.json(user)    
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
}