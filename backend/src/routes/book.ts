import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import _ from "../controllers/booksController";

const router = express.Router();
router.use('/', authMiddleware as any)

router.get('/', _.getAllBooks);
router.get('/:id', _.getBook);
router.post('/', authMiddleware as any, _.createBook as any);
router.put('/:id', authMiddleware as any, _.updateBook as any);
router.delete('/:id', authMiddleware as any, _.deleteBook as any);

export default router;