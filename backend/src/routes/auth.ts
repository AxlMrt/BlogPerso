import express from "express";
import _ from "../controllers/authController";

const router = express.Router();

router.post('/', _.login);
router.post('/logout', _.logout);

export default router;