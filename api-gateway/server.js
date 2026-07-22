const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Security and Logging Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// Define Proxies
const proxies = [
    {
        route: '/api/auth',
        target: 'http://auth-service:5001'
    },
    {
        route: '/api/cars',
        target: 'http://car-service:5002'
    },
    {
        route: '/api/compare',
        target: 'http://compare-car-service:5003'
    }
];

// Setup Proxy Middleware
proxies.forEach(proxy => {
    app.use(proxy.route, createProxyMiddleware({
        target: proxy.target,
        changeOrigin: true,
        timeout: 60000, // 1 minute timeout
        proxyTimeout: 60000,
        onError: (err, req, res) => {
            console.error(`Error with proxy for ${proxy.route}:`, err);
            res.status(502).json({ error: 'Gateway Error: Upstream service unavailable' });
        }
    }));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'API Gateway Node.js' });
});

// Start Gateway
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
