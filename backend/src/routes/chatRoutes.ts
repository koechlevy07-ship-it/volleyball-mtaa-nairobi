import express from 'express';
import { getChatHistory, deleteMessage } from '../controllers/chatController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.use(protect);

router.get('/:tournamentId', getChatHistory);
router.delete('/:messageId', deleteMessage);

export default router;