const { createClient } = require('redis');

let valkeyClient;

const connectValkey = async () => {
    if (process.env.REDIS_URI) {
        valkeyClient = createClient({
            url: process.env.REDIS_URI
        });

        valkeyClient.on('error', (err) => console.log('Valkey Client Error', err));

        try {
            await valkeyClient.connect();
            console.log('Valkey Connected Successfully!');
        } catch (err) {
            console.error('Failed to connect to Valkey:', err.message);
            console.error('Continuing without cache. Please check REDIS_URI in environment variables.');
            valkeyClient = null; // Set to null so the app skips caching logic gracefully
        }
    } else {
        console.log('No REDIS_URI provided, skipping Valkey caching setup.');
    }
};

const getValkeyClient = () => valkeyClient;

module.exports = { connectValkey, getValkeyClient };
