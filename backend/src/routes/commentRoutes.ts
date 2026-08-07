import express from 'express';
import {
  getCommentsByTournament,
  createComment,
  toggleLike,
  reportComment,
  deleteComment,
} from '../controllers/commentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public route to get comments
router.get('/tournament/:tournamentId', getCommentsByTournament);

// Protected routes
router.use(protect);

router.post('/', createComment);
router.patch('/:id/like', toggleLike);
router.post('/:id/report', reportComment);
router.delete('/:id', deleteComment);

export default router;