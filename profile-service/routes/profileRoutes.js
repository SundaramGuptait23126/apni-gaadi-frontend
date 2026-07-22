const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');

// All these routes will be protected by the API Gateway's JWT middleware
// So we can assume req.headers['x-user-id'] is always present and valid

router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;
