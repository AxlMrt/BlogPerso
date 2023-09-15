import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import _ from '../controllers/note.controller';
import { requireAdmin } from '@/middleware/requireOwnershipOrAdmin';

const router = express.Router();

router.get('/', requireAdmin, _.getAllNotes);
router.get('/:id', requireAdmin, _.getNote);
router.post('/', authMiddleware, _.createNote);
router.put('/:id', authMiddleware, _.updateNote);
router.delete('/:id', authMiddleware, _.deleteNote);

export default router;
