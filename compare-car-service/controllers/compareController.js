const axios = require('axios');
const { getValkeyClient } = require('../config/valkeyClient');

const compareCars = async (req, res) => {
    try {
        const { carIds } = req.query;
        if (!carIds) {
            return res.status(400).json({ message: 'Please provide carIds as a comma-separated list' });
        }

        const ids = carIds.split(',').map(id => id.trim()).filter(id => id);
        if (ids.length < 2) {
            return res.status(400).json({ message: 'Please provide at least 2 carIds to compare' });
        }

        const valkeyClient = getValkeyClient();
        const carServiceUrl = process.env.CAR_SERVICE_URL || 'http://localhost:5002/api/cars';

        const carsData = await Promise.all(ids.map(async (id) => {
            const cacheKey = `car_${id}`;
            
            // 1. Try Cache
            if (valkeyClient) {
                try {
                    const cachedCar = await valkeyClient.get(cacheKey);
                    if (cachedCar) {
                        return JSON.parse(cachedCar);
                    }
                } catch (err) {
                    console.error(`Cache read error for ${cacheKey}:`, err);
                }
            }

            // 2. Fallback to API call to car-service
            try {
                const response = await axios.get(`${carServiceUrl}/${id}`);
                const car = response.data;

                // Optionally cache it here as well, though car-service already does it
                if (valkeyClient && car) {
                    try {
                        await valkeyClient.setEx(cacheKey, 3600, JSON.stringify(car));
                    } catch (err) {
                        console.error(`Cache write error for ${cacheKey}:`, err);
                    }
                }
                return car;
            } catch (err) {
                console.error(`Failed to fetch car ${id} from car-service:`, err.message);
                return { _id: id, error: 'Car not found or service unavailable' };
            }
        }));

        res.status(200).json({
            message: 'Comparison data',
            count: carsData.length,
            cars: carsData
        });
    } catch (error) {
        console.error('Error comparing cars:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { compareCars };
