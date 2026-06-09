const Car = require('../models/Car');
const { getValkeyClient } = require('../config/valkeyClient');

// Add a new car (with image upload)
const addCar = async (req, res) => {
    try {
        const { name, brand, tagline, budget, type, category, subCategory, isFeatured } = req.body;
        
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
            category,
            subCategory,
            imageUrl,
            isFeatured: isFeatured === 'true' || isFeatured === true
        });

        await newCar.save();

        // Invalidate cache so new cars show up immediately
        const valkeyClient = getValkeyClient();
        if (valkeyClient) {
            try {
                await valkeyClient.del('cars_all');
                await valkeyClient.del('cars_featured');
                if (category) {
                    await valkeyClient.del(`cars_category_${category}`);
                }
                console.log('Cache invalidated');
            } catch (err) {
                console.error('Cache invalidation error:', err);
            }
        }

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
        const cacheKey = featured === 'true' ? 'cars_featured' : 'cars_all';
        const valkeyClient = getValkeyClient();

        // 1. Try to get data from Valkey cache
        if (valkeyClient) {
            try {
                const cachedCars = await valkeyClient.get(cacheKey);
                if (cachedCars) {
                    console.log('Serving from Valkey cache');
                    return res.status(200).json(JSON.parse(cachedCars));
                }
            } catch (err) {
                console.error('Cache read error:', err);
            }
        }

        // 2. If not in cache, query MongoDB
        let query = {};
        
        if (featured === 'true') {
            query.isFeatured = true;
        }

        const cars = await Car.find(query).sort({ createdAt: -1 });

        // 3. Save the result to Valkey cache for 1 hour (3600 seconds)
        if (valkeyClient) {
            try {
                await valkeyClient.setEx(cacheKey, 3600, JSON.stringify(cars));
                console.log('Saved to Valkey cache');
            } catch (err) {
                console.error('Cache write error:', err);
            }
        }

        res.status(200).json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Fetch cars by category
const getCarsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const cacheKey = `cars_category_${category}`;
        const valkeyClient = getValkeyClient();

        // 1. Try to get data from Valkey cache
        if (valkeyClient) {
            try {
                const cachedCars = await valkeyClient.get(cacheKey);
                if (cachedCars) {
                    console.log(`Serving category ${category} from Valkey cache`);
                    return res.status(200).json(JSON.parse(cachedCars));
                }
            } catch (err) {
                console.error('Cache read error:', err);
            }
        }

        // 2. If not in cache, query MongoDB
        const cars = await Car.find({ category }).sort({ createdAt: -1 });

        // 3. Save the result to Valkey cache for 1 hour (3600 seconds)
        if (valkeyClient) {
            try {
                await valkeyClient.setEx(cacheKey, 3600, JSON.stringify(cars));
                console.log(`Saved category ${category} to Valkey cache`);
            } catch (err) {
                console.error('Cache write error:', err);
            }
        }

        res.status(200).json(cars);
    } catch (error) {
        console.error('Error fetching cars by category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addCar, getCars, getCarsByCategory };
