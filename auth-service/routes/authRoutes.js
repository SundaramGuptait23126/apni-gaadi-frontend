const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const { rateLimit } = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const { getRedisClient } = require('../config/redisClient');

const router = express.Router();

// Rate limiter for Brute-Force protection
const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login requests per `window` (here, per minute)
    message: { message: 'Too many login attempts from this IP, please try again after a minute' },
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args) => getRedisClient().sendCommand(args),
    }),
});

router.post('/signup', signup);
router.post('/login', loginLimiter, login);
router.post('/logout', verifyToken, logout);
router.post('/refresh-token', require('../controllers/authController').refreshToken);
router.get('/me', verifyToken, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;
