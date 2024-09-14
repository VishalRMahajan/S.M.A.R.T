import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({success: false, message: 'Unauthorized - token to access the resource is missing'});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) return res.status(401).json({success: false, message: 'Unauthorized - token to access the resource is invalid'});

        req.userID = decoded.userId;
        next();
    } catch (error) {
        return res.status(500).json({success: false, message: 'Server error', error: error.message});
    }

}