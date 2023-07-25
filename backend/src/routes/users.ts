import express from "express";
import _ from "../controllers/usersController";

const router = express.Router();
router.get('/users', _.getAllUsers);
router.get('/users/:id', _.getUser);
router.post('/users', _.createUser);
router.put('/users/:id', _.updateUser);
router.delete('/users/:id', _.deleteUser);

export default router;