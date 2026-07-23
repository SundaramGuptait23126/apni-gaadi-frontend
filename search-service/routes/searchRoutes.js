const express = require('express');
const router = express.Router();
const { searchCars } = require('../controllers/searchController');

// GET /api/search?q=Nexon
router.get('/', searchCars);

module.exports = router;
