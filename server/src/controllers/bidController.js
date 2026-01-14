import Bid from '../models/Bid.js';
import Gig from '../models/Gig.js';

// 1. PLACE A BID
export const placeBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;
    
    // Check if gig is open
    const gig = await Gig.findById(gigId);
    if (!gig || gig.status !== 'open') {
      return res.status(400).json({ message: 'Gig not available' });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price
    });
    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. GET BIDS FOR A SPECIFIC GIG
export const getBidsForGig = async (req, res) => {
  try {
    const bids = await Bid.find({ gigId: req.params.gigId })
      .populate('freelancerId', 'name email');
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. HIRE FREELANCER
export const hireFreelancer = async (req, res) => {
  try {
    const { bidId } = req.params;

    // A. Find the Bid
    const bid = await Bid.findById(bidId);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });

    // B. Find the Gig
    const gig = await Gig.findById(bid.gigId);

    
    if (gig.status === 'assigned') {
      return res.status(400).json({ message: 'Gig already assigned!' });
    }

    // C. Update statuses
    gig.status = 'assigned';
    await gig.save();

    bid.status = 'hired';
    await bid.save();

    // D. Reject all OTHER bids for this gig
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bidId } },
      { status: 'rejected' }
    );

    res.json({ message: 'Hired successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};