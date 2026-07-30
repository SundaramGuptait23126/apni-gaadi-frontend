const { createClient } = require('redis');

let redisClient;

const connectRedis = async () => {
    // Connect to Redis only if REDIS_URI is provided
    if (process.env.REDIS_URI) {
        redisClient = createClient({
            url: process.env.REDIS_URI
        });

        redisClient.on('error', (err) => console.log('Redis Client Error', err));

        try {
            await redisClient.connect();
            console.log('Redis Connected Successfully!');
        } catch (err) {
            console.error('Failed to connect to Redis:', err.message);
        }
    } else {
        console.log('No REDIS_URI provided, skipping Redis caching setup.');
    }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };
