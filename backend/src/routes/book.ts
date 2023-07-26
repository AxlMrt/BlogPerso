import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import _ from "../controllers/booksController";

const router = express.Router();
router.use('/*', authMiddleware)

router.get('/feed', _.getAllBooks);
router.get('/:id', _.getBook);
router.post('/', authMiddleware, _.createBook);
router.put('/:id', authMiddleware, _.updateBook);
router.delete('/:id', authMiddleware, _.deleteBook);

export default router;