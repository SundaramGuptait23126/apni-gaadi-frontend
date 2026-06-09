const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.get('/me', verifyToken, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;
