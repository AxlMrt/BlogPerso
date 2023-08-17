import express from "express";
import _ from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post('/', _.login);
router.post('/logout', _.logout);
router.post('/forget-password', _.forgetPassword)
router.post('/reset-password', _.resetPassword)
router.get('/profile', authMiddleware, _.getUserProfile);

export default router;