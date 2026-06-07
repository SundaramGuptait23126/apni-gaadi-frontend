const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const carRoutes = require('./routes/carRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// For now, no actual MongoDB connection, just to get the API running quickly for the UI
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

app.use('/api/cars', carRoutes);

app.get('/', (req, res) => {
    res.send('Apni Gaadi Dekho API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
