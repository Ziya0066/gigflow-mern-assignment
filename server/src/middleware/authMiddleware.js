import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if the 'jwt' cookie exists
  token = req.cookies.jwt;

  if (token) {
    try {
      // 2. Decode the token to get the User ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user in the DB and attach it to the request
      // (-password means "don't include the password in the data")
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move to the next step (the controller)
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};