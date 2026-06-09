const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// We must load connectDB AFTER dotenv so process.env.MONGO_URI is ready
const connectDB = require('./config/db');
const carRoutes = require('./routes/carRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/cars', carRoutes);

app.get('/', (req, res) => {
    res.send('Car Service is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Car Service running on port ${PORT}`);
});
