const express = require('express');
const UserController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', UserController.createUserController); 
router.get('/:id', authenticateToken, UserController.getUserByIdController);
router.get('/username/:username', authenticateToken, UserController.getUserByUsernameController);
router.get('/email/:email', authenticateToken, UserController.getUserByEmailController);
router.put('/:id', authenticateToken, UserController.updateUserController);
router.delete('/:id', authenticateToken, UserController.deleteUserController);

module.exports = router;
