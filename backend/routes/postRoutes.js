import express from 'express';
import { createPost, deletePost, getAllPost, getPostById, getPostsByUser, updatePost } from '../controllers/postController.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

// Routes for posts
router.post('/create', verifyToken, createPost);
router.get('/getPost', verifyToken, getAllPost);
router.get('/user', verifyToken, getPostsByUser);  // Get posts for logged-in user

// New route to get a specific post by ID
router.get('/:id', verifyToken,getPostById)

router.patch('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);

export default router;
