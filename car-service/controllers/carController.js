const Car = require('../models/Car');

// Add a new car (with image upload)
const addCar = async (req, res) => {
    try {
        const { name, brand, tagline, budget, type, isFeatured } = req.body;
        
        // If image uploaded successfully, multer puts the secure URL in req.file.path
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }
        
        const imageUrl = req.file.path; // Cloudinary URL

        const newCar = new Car({
            name,
            brand,
            tagline,
            budget,
            type,
            imageUrl,
            isFeatured: isFeatured === 'true' || isFeatured === true
        });

        await newCar.save();
        res.status(201).json({ message: 'Car added successfully', car: newCar });
    } catch (error) {
        console.error('Error adding car:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Fetch all cars (or filter by featured)
const getCars = async (req, res) => {
    try {
        const { featured } = req.query;
        let query = {};
        
        if (featured === 'true') {
            query.isFeatured = true;
        }

        const cars = await Car.find(query).sort({ createdAt: -1 });
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addCar, getCars };
