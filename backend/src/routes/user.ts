import express from 'express';
import upload from '../utils/upload';
import _ from '../controllers/user.controller';
import { requireAdmin, requireOwnershipOrAdmin } from '@/middleware/requireOwnershipOrAdmin';

const router = express.Router();

router.get('/', requireAdmin, _.getAllUsers);
router.get('/:id', requireAdmin, _.getUser);
router.post('/', _.createUser);
router.put('/:id', upload, requireOwnershipOrAdmin, _.updateUser);
router.delete('/:id', requireOwnershipOrAdmin, _.deleteUser);

export default router;
