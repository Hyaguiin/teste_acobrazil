const express = require('express');
const AuthController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', AuthController.loginController); 
router.post('/logout', authenticateToken, AuthController.logoutController);
router.get('/verify-token', authenticateToken, AuthController.verifyTokenController);

module.exports = router;
