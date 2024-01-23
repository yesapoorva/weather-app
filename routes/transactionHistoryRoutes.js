import express from 'express';
import transactionHistory from '../controllers/transactionControllers.js';

const router = express.Router();

router.get("/transactionHistory", transactionHistory);

export default router