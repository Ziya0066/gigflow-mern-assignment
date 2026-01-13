import express from 'express';
import { createGig, getAllGigs, getGigById } from '../controllers/gigController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Route: Anyone can see jobs
router.get('/', getAllGigs);
router.get('/:id', getGigById);

// Protected Route: Only logged-in users can post jobs
router.post('/', protect, createGig);

export default router;