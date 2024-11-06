import express from 'express';
import { createTask, deleteTask, getMonthlyTaskStats, getTask, getTaskByDate, getTasks, updateTask } from '../controllers/taskController.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.post('/tasks',verifyToken, createTask);
router.get('/tasks', verifyToken, getTasks);
router.get('/task/:date', verifyToken, getTaskByDate);
router.put('/task/:id', verifyToken, updateTask);
router.get('/tasks/monthly', verifyToken, getMonthlyTaskStats);
router.post('/task/:id', verifyToken, deleteTask);

export default router;