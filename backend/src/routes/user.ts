import express from "express";
import upload from "../utils/upload";
import _ from "../controllers/user.controller";

const router = express.Router();

router.get('/', _.getAllUsers);
router.get('/:id', _.getUser);
router.post('/', _.createUser);
router.put('/:id', upload, _.updateUser);
router.delete('/:id', _.deleteUser);

export default router;