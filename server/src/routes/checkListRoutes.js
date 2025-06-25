const express = require('express');
const ChecklistController = require('../controllers/checkListController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, ChecklistController.createChecklistController);
router.get('/:id', authenticateToken, ChecklistController.getChecklistByIdController);
router.get('/user/:userId', authenticateToken, ChecklistController.getAllChecklistsByUserIdController);
router.put('/:id', authenticateToken, ChecklistController.updateChecklistController);
router.delete('/:id', authenticateToken, ChecklistController.deleteChecklistController);

module.exports = router;
