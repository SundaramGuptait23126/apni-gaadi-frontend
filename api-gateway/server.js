const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
const { verifyToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors());
// Removed morgan logging to save CPU/Disk IO at 100k scale

// Custom HTTP Agent for Persistent Connections
const http = require('http');
const keepAliveAgent = new http.Agent({
    keepAlive: true,
    maxSockets: 65535, // Match Nginx max connections
    maxFreeSockets: 1024,
    timeout: 60000
});

// Global JWT Auth Middleware
app.use(verifyToken);


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
        agent: keepAliveAgent, // Use persistent connections
        timeout: 60000, // 1 minute timeout
        proxyTimeout: 60000,
        onError: (err, req, res) => {
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
