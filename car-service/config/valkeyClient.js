const { createClient } = require('redis');

let valkeyClient;

const connectValkey = async () => {
    if (process.env.REDIS_URI) {
        valkeyClient = createClient({
            url: process.env.REDIS_URI
        });

        valkeyClient.on('error', (err) => console.log('Valkey Client Error', err));

        await valkeyClient.connect();
        console.log('Valkey Connected Successfully!');
    } else {
        console.log('No REDIS_URI provided, skipping Valkey caching setup.');
    }
};

const getValkeyClient = () => valkeyClient;

module.exports = { connectValkey, getValkeyClient };
