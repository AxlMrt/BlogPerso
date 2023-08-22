import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import _ from "../controllers/userQuery.controller";

const router = express.Router();
router.get('/bookList/:id', authMiddleware, _.getUserBooks);

export default router;