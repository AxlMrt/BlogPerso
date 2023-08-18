import express from 'express';
import _ from '../controllers/otp.controller';

const router = express.Router();

router.post('/', _.createOTP);
router.post('/verify', _.verifyOTP);

export default router;