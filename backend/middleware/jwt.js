// verifyToken.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Access Denied, token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id; // Sets userId based on token payload
        req.userRole = decoded.role;
        next();
    } catch (err) {
        console.error("Error verifying token:", err.message);
        res.status(401).json({ message: "Invalid Token", error: err.message });
    }
};

// getUserProfile function
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');  // Use req.userId here
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};
