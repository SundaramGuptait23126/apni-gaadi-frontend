const express = require('express');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./config/db');
const { connectRedis } = require('./config/redisClient');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Auth Service is running...');
});

// Start Server
const startServer = async () => {
    try {
        await connectDB();
        await connectRedis();
        
        // Sync models with DB (Creates table if it doesn't exist)
        await sequelize.sync();
        console.log('Database synced');

        // Start Server
        const server = app.listen(PORT, () => {
            console.log(`Auth Service running on port ${PORT}`);
        });

        // Enable Keep-Alive to handle heavy burst traffic
        server.keepAliveTimeout = 61000;
        server.headersTimeout = 65000;
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
