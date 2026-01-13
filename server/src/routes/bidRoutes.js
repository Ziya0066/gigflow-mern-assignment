import express from 'express';
import { placeBid, getBidsForGig, hireFreelancer } from '../controllers/bidController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All bid actions require you to be logged in
router.post('/', protect, placeBid);
router.get('/:gigId', protect, getBidsForGig);
router.patch('/:bidId/hire', protect, hireFreelancer);

export default router;