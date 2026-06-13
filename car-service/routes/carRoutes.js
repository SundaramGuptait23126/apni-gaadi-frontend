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

// Route to add a car (Expects 'exteriorImages' and 'interiorImages' arrays in multipart/form-data)
router.post('/', upload.fields([
    { name: 'exteriorImages', maxCount: 15 },
    { name: 'interiorImages', maxCount: 15 }
]), addCar);

module.exports = router;
