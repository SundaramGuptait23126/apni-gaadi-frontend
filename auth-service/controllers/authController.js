const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getRedisClient } = require('../config/redisClient');

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
        if (redisClient) {
            await redisClient.setEx(`user:${email}`, 3600 * 24 * 7, JSON.stringify({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                password: hashedPassword
            }));
        }

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

        // Check Redis cache first
        const redisClient = getRedisClient();
        let user;
        
        if (redisClient) {
            const cachedUser = await redisClient.get(`user:${email}`);
            if (cachedUser) {
                user = JSON.parse(cachedUser);
            }
        }

        // If not in cache, check MySQL
        if (!user) {
            user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Cache for next time
            if (redisClient) {
                await redisClient.setEx(`user:${email}`, 3600 * 24 * 7, JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password
                }));
            }
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

module.exports = { signup, login };
