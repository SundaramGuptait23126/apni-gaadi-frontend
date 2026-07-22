const express = require('express');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// Routes
const profileRoutes = require('./routes/profileRoutes');
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => {
    res.send('Profile Service is running...');
});

// Start Server
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        const server = app.listen(PORT, () => {
            console.log(`Profile Service running on port ${PORT}`);
        });

        // Enable Keep-Alive to handle heavy burst traffic
        server.keepAliveTimeout = 61000;
        server.headersTimeout = 65000;
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
