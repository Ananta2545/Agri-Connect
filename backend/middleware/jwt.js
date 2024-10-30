import jwt from 'jsonwebtoken';

//middleware to verify token

export const verifyToken = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(403).json({message: "Access Denied, token missing"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    }catch(err){
        res.status(401).json({message: "Invalid Token"});
    }
}