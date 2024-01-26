const express = require('express');
const router = express.Router();
const subTaskController = require('../controllers/subTaskController');
const authService = require('../services/authenticationService');

router.post('/create', authService.protect, subTaskController.createSubTask);
router.put('/update/:subTaskId', authService.protect, subTaskController.updateSubTask);
router.delete('/delete/:subTaskId', authService.protect, subTaskController.deleteSubTask);

module.exports = router;
