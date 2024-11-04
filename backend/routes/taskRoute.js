import express from 'express';
import { createTask, deleteTask, getMonthlyTaskStats, getTask, getTaskByDate, getTasks, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/task/:date', getTaskByDate);
router.put('/task/:id', updateTask);
router.get('/tasks/monthly', getMonthlyTaskStats);
router.post('/task/:id', deleteTask);

export default router;