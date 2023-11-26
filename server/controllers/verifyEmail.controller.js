import { verifyEmailToken } from '../utils/emailToken.util.js';
import db from '../models/index.js';

const User = db.user;

// Verify email using token verification.
export const verifyEmail = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send({ message: 'No token provided.' });
  }

  try {
    const decoded = verifyEmailToken(token);
    if (!decoded) {
      return res.status(400).send({ message: 'Invalid or expired token.' });
    }

    const user = await User.findOne({ where: { username: decoded.username } });
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    if (user.is_active) {
      return res.status(400).send({ message: 'User has already been verified. Please Log In.' });
    }

    user.is_active = true;
    await user.save();

    res.send({ message: 'Account verified successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to verify account.' });
  }
};
