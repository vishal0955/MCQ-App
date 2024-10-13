const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/error');

const auth = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
    
        if (!token) {
            return sendError(res, 401, "Access token is required");
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log('Token verification error: ', err);
                return sendError(res, 401, "Invalid or expired token");
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.log('error: ', error);
        return sendError(res, 500, "Internal Server Error");
    }
};

module.exports = auth; 
