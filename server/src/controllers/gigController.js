import Gig from '../models/Gig.js';

// 1. CREATE GIG
export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;
    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id 
    });
    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. GET ALL OPEN GIGS
export const getAllGigs = async (req, res) => {
  try {
    
    const keyword = req.query.search
      ? { title: { $regex: req.query.search, $options: 'i' } }
      : {};

  
    const gigs = await Gig.find({ ...keyword, status: 'open' })
      .populate('ownerId', 'name email');
      
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. GET SINGLE GIG
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('ownerId', 'name email');
    if (gig) res.json(gig);
    else res.status(404).json({ message: 'Gig not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};