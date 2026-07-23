const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getRedisClient } = require('../config/redisClient');

// --- Advanced Caching Mechanisms ---
// 1. Ultra-Fast L1 RAM Cache
const l1Cache = new Map();
const L1_TTL_MS = 5000; // 5 seconds TTL for L1 Cache to handle extreme traffic spikes

// 2. Request Coalescing (Cache Stampede Protection)
const pendingRequests = new Map();

// Helper to set L1 cache with TTL
const setL1Cache = (key, value) => {
    l1Cache.set(key, value);
    setTimeout(() => {
        l1Cache.delete(key);
    }, L1_TTL_MS);
};

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Strict Password Policy: Min 8 chars, 1 Uppercase, 1 Number, 1 Special Char
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(4);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Cache user in Redis for fast future logins
        const redisClient = getRedisClient();
        const userDataToCache = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            password: hashedPassword
        };
        
        if (redisClient) {
            await redisClient.setEx(`user:${email}`, 3600 * 24 * 7, JSON.stringify(userDataToCache));
        }
        setL1Cache(`user:${email}`, userDataToCache);

        // Generate Dual Tokens
        const accessToken = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET + '_refresh'),
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token: accessToken, // for backward compatibility
            accessToken,
            refreshToken,
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // We fetch directly from DB to get the most accurate lock status (security over extreme caching for login)
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if account is locked
        if (user.lockUntil && user.lockUntil > new Date()) {
            return res.status(403).json({ 
                message: 'Account is temporarily locked due to multiple failed login attempts. Please try again later.' 
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Increment failed attempts
            user.failedLoginAttempts += 1;
            if (user.failedLoginAttempts >= 5) {
                // Lock account for 15 minutes
                user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
            }
            await user.save();
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Login successful, reset attempts
        if (user.failedLoginAttempts > 0) {
            user.failedLoginAttempts = 0;
            user.lockUntil = null;
            await user.save();
        }

        // Generate Dual Tokens (Access + Refresh)
        const accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' } // Short-lived Access Token
        );

        const refreshToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET + '_refresh'),
            { expiresIn: '7d' } // Long-lived Refresh Token
        );

        res.status(200).json({
            message: 'Login successful',
            token: accessToken, // for backward compatibility in frontend
            accessToken,
            refreshToken,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        
        // Decode token to find expiration
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const now = Math.floor(Date.now() / 1000);
        const timeRemaining = decoded.exp - now;

        if (timeRemaining > 0) {
            const redisClient = getRedisClient();
            if (redisClient) {
                // Add token to blocklist with expiration equal to token's remaining life
                await redisClient.setEx(`bl:${token}`, timeRemaining, 'blocked');
            }
        }

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ message: 'Refresh token is required' });
        }

        const refreshSecret = process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET + '_refresh');

        // Verify refresh token
        jwt.verify(token, refreshSecret, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired refresh token' });
            }

            // Optional: check if user still exists/isn't locked out in DB
            const user = await User.findByPk(decoded.userId);
            if (!user) {
                return res.status(403).json({ message: 'User no longer exists' });
            }
            if (user.lockUntil && user.lockUntil > new Date()) {
                return res.status(403).json({ message: 'Account is locked' });
            }

            // Issue new Access Token (15 min)
            const newAccessToken = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
            );

            res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { signup, login, logout, refreshToken };
