const express = require('express');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(compression());
app.use(express.json());

const searchRoutes = require('./routes/searchRoutes');
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
    res.send('Search Service is running...');
});

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for Search Service');

        const server = app.listen(PORT, () => {
            console.log(`Search Service running on port ${PORT}`);
        });

        server.keepAliveTimeout = 61000;
        server.headersTimeout = 65000;
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
