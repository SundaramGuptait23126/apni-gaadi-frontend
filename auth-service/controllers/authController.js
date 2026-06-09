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

        // Create JWT token
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
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

        let user;
        const cacheKey = `user:${email}`;

        // 1. Check Ultra-Fast L1 RAM Cache
        if (l1Cache.has(cacheKey)) {
            user = l1Cache.get(cacheKey);
        } else {
            // 2. Request Coalescing (Stampede Protection)
            if (pendingRequests.has(cacheKey)) {
                // Wait for the already-running query instead of triggering a new one
                user = await pendingRequests.get(cacheKey);
            } else {
                // Create a single promise for the DB/Redis fetch
                const fetchUserPromise = (async () => {
                    let fetchedUser = null;
                    const redisClient = getRedisClient();
                    
                    // Check L2 Redis Cache
                    if (redisClient) {
                        const cachedStr = await redisClient.get(cacheKey);
                        if (cachedStr) {
                            fetchedUser = JSON.parse(cachedStr);
                        }
                    }

                    // Check L3 Database
                    if (!fetchedUser) {
                        const dbUser = await User.findOne({ where: { email } });
                        if (dbUser) {
                            fetchedUser = {
                                id: dbUser.id,
                                name: dbUser.name,
                                email: dbUser.email,
                                password: dbUser.password
                            };
                            
                            // Save to L2 Redis
                            if (redisClient) {
                                await redisClient.setEx(cacheKey, 3600 * 24 * 7, JSON.stringify(fetchedUser));
                            }
                        }
                    }
                    return fetchedUser;
                })();

                // Store promise in pending map to coalesce simultaneous requests
                pendingRequests.set(cacheKey, fetchUserPromise);
                
                try {
                    user = await fetchUserPromise;
                    if (user) {
                        // Populate L1 RAM Cache
                        setL1Cache(cacheKey, user);
                    }
                } finally {
                    // Remove from pending map once resolved
                    pendingRequests.delete(cacheKey);
                }
            }
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
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

module.exports = { signup, login, logout };
