const jwt = require('jsonwebtoken');
const { getRedisClient } = require('../config/redisClient');

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        // Verify signature
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check Redis Blocklist
        const redisClient = getRedisClient();
        if (redisClient) {
            const isBlocked = await redisClient.get(`bl:${token}`);
            if (isBlocked) {
                return res.status(401).json({ message: 'Token has been revoked. Please login again.' });
            }
        }

        req.user = decoded; // Contains userId and email
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { verifyToken };
