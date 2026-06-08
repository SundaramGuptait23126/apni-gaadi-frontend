const { createClient } = require('redis');

let redisClient;

const connectRedis = async () => {
    // Connect to Redis only if REDIS_URI is provided
    if (process.env.REDIS_URI) {
        redisClient = createClient({
            url: process.env.REDIS_URI
        });

        redisClient.on('error', (err) => console.log('Redis Client Error', err));

        await redisClient.connect();
        console.log('Redis Connected Successfully!');
    } else {
        console.log('No REDIS_URI provided, skipping Redis caching setup.');
    }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };
