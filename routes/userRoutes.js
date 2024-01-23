import express from 'express';
import userControllers from '../controllers/userControllers.js';

const { registerUser, authUser } = userControllers;

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", authUser);

export default router