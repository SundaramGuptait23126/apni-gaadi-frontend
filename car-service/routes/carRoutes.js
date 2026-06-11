const express = require('express');
const { upload } = require('../config/cloudinary');
const { addCar, getCars, getCarsByCategory, getCarById } = require('../controllers/carController');

const router = express.Router();

// Route to fetch cars (Query param: ?featured=true)
router.get('/', getCars);

// Route to fetch cars by category
router.get('/category/:category', getCarsByCategory);

// Route to fetch a single car by ID
router.get('/:id', getCarById);

// Route to add a car (Expects 'images' array in multipart/form-data)
router.post('/', upload.array('images', 10), addCar);

module.exports = router;
