import express from 'express';
import _ from '../controllers/auth.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', _.login);
router.post('/logout', _.logout);
router.get('/profile', authMiddleware, _.getUserProfile);

router.post('/reset-password-request', _.passwordRequestReset);
router.post('/reset-password', _.resetPassword);
export default router;
