import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Gig from './src/models/Gig.js';
import Bid from './src/models/Bid.js';

dotenv.config();

const clearData = async () => {
  try {
    // 1. Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // 2. Delete Everything
    await User.deleteMany({});
    console.log('Users deleted...');
    
    await Gig.deleteMany({});
    console.log('Gigs deleted...');

    await Bid.deleteMany({});
    console.log('Bids deleted...');

    console.log('SUCCESS: Database is now empty!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

clearData();