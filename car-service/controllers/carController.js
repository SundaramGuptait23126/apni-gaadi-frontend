const Car = require('../models/Car');
const { getValkeyClient } = require('../config/valkeyClient');

// Add a new car (with image upload)
const addCar = async (req, res) => {
    try {
        const { name, brand, tagline, budget, type, category, subCategory, fuelType, transmission, engine, groundClearance, seatingCapacity, isFeatured } = req.body;
        
        // multer puts uploaded files in req.files (an object when using upload.fields)
        const exteriorImagesFiles = req.files && req.files['exteriorImages'] ? req.files['exteriorImages'] : [];
        const interiorImagesFiles = req.files && req.files['interiorImages'] ? req.files['interiorImages'] : [];

        if (exteriorImagesFiles.length === 0 && interiorImagesFiles.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }
        
        const exteriorImages = exteriorImagesFiles.map(file => file.path);
        const interiorImages = interiorImagesFiles.map(file => file.path);
        
        // Primary image: first exterior image, or first interior if no exterior
        const imageUrl = exteriorImages.length > 0 ? exteriorImages[0] : interiorImages[0];
        // Keep a generic images array for backward compatibility if needed, combining both
        const images = [...exteriorImages, ...interiorImages];

        const newCar = new Car({
            name,
            brand,
            tagline,
            budget,
            type,
            category,
            subCategory,
            fuelType,
            transmission,
            engine,
            groundClearance,
            seatingCapacity,
            imageUrl,
            images,
            exteriorImages,
            interiorImages,
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
                    if (subCategory) {
                        await valkeyClient.del(`cars_category_${category}_sub_${subCategory}`);
                    }
                }
                console.log('Cache invalidated');
            } catch (err) {
                console.error('Cache invalidation error:', err);
            }
        }

        res.status(201).json({ message: 'Car added successfully', car: newCar });
    } catch (error) {
        console.error('Error adding car:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
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
        const { subCategory } = req.query;
        
        let cacheKey = `cars_category_${category}`;
        if (subCategory) {
            cacheKey += `_sub_${subCategory}`;
        }
        
        const valkeyClient = getValkeyClient();

        // 1. Try to get data from Valkey cache
        if (valkeyClient) {
            try {
                const cachedCars = await valkeyClient.get(cacheKey);
                if (cachedCars) {
                    console.log(`Serving ${cacheKey} from Valkey cache`);
                    return res.status(200).json(JSON.parse(cachedCars));
                }
            } catch (err) {
                console.error('Cache read error:', err);
            }
        }

        // 2. If not in cache, query MongoDB
        let query = { category };
        if (subCategory) {
            query.subCategory = subCategory;
        }

        const cars = await Car.find(query).sort({ createdAt: -1 });

        // 3. Save the result to Valkey cache for 1 hour (3600 seconds)
        if (valkeyClient) {
            try {
                await valkeyClient.setEx(cacheKey, 3600, JSON.stringify(cars));
                console.log(`Saved ${cacheKey} to Valkey cache`);
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

// Fetch a single car by ID
const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const cacheKey = `car_${id}`;
        const valkeyClient = getValkeyClient();

        if (valkeyClient) {
            try {
                const cachedCar = await valkeyClient.get(cacheKey);
                if (cachedCar) {
                    console.log(`Serving ${cacheKey} from Valkey cache`);
                    return res.status(200).json(JSON.parse(cachedCar));
                }
            } catch (err) {
                console.error('Cache read error:', err);
            }
        }

        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        if (valkeyClient) {
            try {
                await valkeyClient.setEx(cacheKey, 3600, JSON.stringify(car));
            } catch (err) {
                console.error('Cache write error:', err);
            }
        }

        res.status(200).json(car);
    } catch (error) {
        console.error('Error fetching car by id:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addCar, getCars, getCarsByCategory, getCarById };
