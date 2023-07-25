import express from "express";
import _ from "../controllers/usersController";

const router = express.Router();

router.get('/', _.getAllUsers);
router.get('/:id', _.getUser);
router.post('/', _.createUser);
router.put('/:id', _.updateUser);
router.delete('/:id', _.deleteUser);

export default router;