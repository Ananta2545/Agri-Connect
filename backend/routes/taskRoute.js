import express from 'express';
import { createTask, deleteTask, getTask, getTasks } from '../controllers/taskController.js';

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/task/:id', getTask);
router.post('/task/:id', deleteTask);
export default router;