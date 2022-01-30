import express from 'express';
import { getResults } from '../controllers/history';

const router = express.Router();

router.get('/history', getResults);

export default router;
