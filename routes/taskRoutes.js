const express = require('express');
const router = express.Router();
const authService = require('../services/authenticationService');
const { createTask, updateTaskDueDate, getAllUserTasks,deleteTask,callTo } = require('../controllers/taskController');

router.post('/create', authService.protect, createTask);
router.patch('/update/:taskId', authService.protect, updateTaskDueDate);
router.get('/getAll', getAllUserTasks);
router.delete('/delete/:taskId', authService.protect, deleteTask); 
router.get('/call',callTo);

module.exports = router;
