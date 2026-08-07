import express from 'express';
import {
  getAllTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament,
} from '../controllers/tournamentController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getAllTournaments);
router.get('/:id', getTournamentById);

// Protected routes
router.use(protect); // All routes below require authentication

router.post('/', createTournament);
router.put('/:id', updateTournament);
router.delete('/:id', deleteTournament);

// Organizer/Admin only routes
router.delete('/:id/admin', restrictTo('super_admin', 'organizer'), deleteTournament);

export default router;