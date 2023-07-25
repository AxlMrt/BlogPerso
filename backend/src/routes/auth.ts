import express from "express";
import _ from "../controllers/authController";

const router = express.Router();

router.post('/', _.login);

export default router;