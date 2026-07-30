const jwt = require('jsonwebtoken');
const Redis = require('ioredis');

// Setup Redis Client
let redisClient;
if (process.env.REDIS_URI) {
    redisClient = new Redis(process.env.REDIS_URI);
    redisClient.on('error', (err) => console.error('Redis Client Error in Gateway', err));
}

// Define routes that DO NOT require authentication
const publicRoutes = [
    { method: 'POST', path: '/api/auth/login' },
    { method: 'POST', path: '/api/auth/signup' },
    { method: 'GET', path: '/api/cars' },      // Allow all GET requests for cars
    { method: 'GET', path: '/api/compare' },   // Allow all GET requests for compare
    { method: 'GET', path: '/health' }
];

const isPublicRoute = (req) => {
    // Exact match for base routes
    for (let route of publicRoutes) {
        if (req.method === route.method) {
            // Check exact or starting path
            const basePath = req.originalUrl.split('?')[0];
            if (basePath === route.path || basePath.startsWith(route.path + '/')) {
                return true;
            }
        }
    }
    return false;
};

const verifyToken = async (req, res, next) => {
    // 1. Bypass authentication for public routes
    if (isPublicRoute(req)) {
        return next();
    }

    // 2. Check for token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Gateway: Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 3. Verify signature
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Check Redis Blocklist for logged-out tokens
        if (redisClient) {
            const isBlocked = await redisClient.get('bl:' + token);
            if (isBlocked) {
                return res.status(401).json({ message: 'Gateway: Token has been revoked. Please login again.' });
            }
        }

        // 5. Inject User Info into Headers (so downstream services know who is calling)
        req.headers['x-user-id'] = decoded.userId;
        req.headers['x-user-email'] = decoded.email;

        // Forward to the downstream microservice
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Gateway: Token expired' });
        }
        return res.status(401).json({ message: 'Gateway: Invalid token' });
    }
};

module.exports = { verifyToken };
