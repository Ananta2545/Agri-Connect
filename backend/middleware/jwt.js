import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Check for token in cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(403).json({ message: "Access Denied, token missing" });
    }

    // console.log("Token received:", token);  // Log the token to verify it is being passed

    try {
        // Attempt to verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // console.log("Decoded Token:", decoded);  // Log the decoded token for debugging

        // Access the 'id' field instead of 'userId'
        req.userId = decoded.id;  // Use 'id' instead of 'userId' based on your token structure
        req.userRole = decoded.role;

        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Error verifying token:", err.message);  // Log the error message for better debugging
        res.status(401).json({ message: "Invalid Token", error: err.message });
    }
};
