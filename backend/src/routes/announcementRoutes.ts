import express from 'express';
import {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  togglePin,
} from '../controllers/announcementController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getAllAnnouncements);
router.get('/:id', getAnnouncementById);

// Protected routes
router.use(protect);

router.post('/', createAnnouncement);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);

// Admin only route
router.patch('/:id/pin', restrictTo('super_admin'), togglePin);

export default router;