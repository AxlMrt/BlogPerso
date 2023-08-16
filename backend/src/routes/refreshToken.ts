import express from "express";
import _ from "../controllers/refreshedToken.controller";

const router = express.Router();

router.post('/', _.refreshedToken);

export default router;