const express = require('express');
const { upload } = require('../config/cloudinary');
const { addCar, getCars, getCarsByCategory } = require('../controllers/carController');

const router = express.Router();

// Route to fetch cars (Query param: ?featured=true)
router.get('/', getCars);

// Route to fetch cars by category
router.get('/category/:category', getCarsByCategory);

// Route to add a car (Expects 'image' field in multipart/form-data)
router.post('/', upload.single('image'), addCar);

module.exports = router;
