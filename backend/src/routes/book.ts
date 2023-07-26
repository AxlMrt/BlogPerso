import express from "express";
import _ from "../controllers/booksController";

const router = express.Router();

router.get('/feed', _.getAllBooks);
router.get('/:id', _.getBook);
router.post('/', _.createBook);
router.put('/:id', _.updateBook);
router.delete('/:id', _.deleteBook);

export default router;