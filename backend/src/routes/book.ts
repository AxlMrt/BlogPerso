import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import _ from '../controllers/book.controller';
import { requireAdmin } from '@/middleware/requireOwnershipOrAdmin';

const router = express.Router();

router.get('/feed', requireAdmin, _.getAllBooks);
router.get('/:id', requireAdmin, _.getBook);
router.post('/', authMiddleware, _.createBook);
router.put('/:id', authMiddleware, _.updateBook);
router.delete('/:id', authMiddleware, _.deleteBook);

export default router;
