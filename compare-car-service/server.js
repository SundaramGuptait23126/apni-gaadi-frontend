const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { connectValkey } = require('./config/valkeyClient');
const compareRoutes = require('./routes/compareRoutes');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

connectValkey();

app.use('/api/compare', compareRoutes);

app.get('/', (req, res) => {
    res.send('Compare Car Service is running...');
});

app.use((err, req, res, next) => {
    console.error('Express Error Handler:', err);
    res.status(500).json({ 
        message: err.message || 'Internal Server Error in Middleware',
        error: err.name
    });
});

app.listen(PORT, () => {
    console.log(`Compare Car Service running on port ${PORT}`);
});
