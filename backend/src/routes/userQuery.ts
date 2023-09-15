import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import _ from '../controllers/userQuery.controller';

const router = express.Router();
router.get('/bookList/:id', authMiddleware, _.getUserBooks);
router.get('/noteList/:id', authMiddleware, _.getUserNotes);

export default router;
