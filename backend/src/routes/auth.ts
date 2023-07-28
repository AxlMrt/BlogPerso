import express from "express";
import _ from "../controllers/auth.controller";

const router = express.Router();

router.post('/', _.login);
router.post('/logout', _.logout);

export default router;