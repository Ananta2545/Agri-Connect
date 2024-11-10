// verifyToken.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Cookies:", req.cookies); // Verify cookies object
    console.log("Token:", token); // Verify token value

    if (!token) {
        console.log("No token found in cookies or headers.");
        return res.status(403).json({ message: "Access Denied, token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id; // Sets userId based on token payload
        req.userRole = decoded.role;
        console.log("Token verified successfully. User ID:", req.userId);
        next();
    } catch (err) {
        console.error("Error verifying token:", err.message);
        res.status(401).json({ message: "Invalid Token", error: err.message });
    }
};
