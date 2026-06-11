const express = require('express');
const { compareCars } = require('../controllers/compareController');

const router = express.Router();

router.get('/', compareCars);

module.exports = router;
