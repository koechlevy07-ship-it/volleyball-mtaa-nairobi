import express from 'express';
import multer from 'multer';
import {
  getAllPosters,
  getPosterById,
  createPoster,
  updatePoster,
  deletePoster,
} from '../controllers/posterController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Public routes
router.get('/', getAllPosters);
router.get('/:id', getPosterById);

// Protected routes
router.use(protect);

router.post('/', upload.single('image'), createPoster);
router.put('/:id', updatePoster);
router.delete('/:id', restrictTo('super_admin', 'organizer'), deletePoster);

export default router;
