import { verifyEmailToken } from '../utils/emailToken.util.js';
import db from '../models/index.js';

const User = db.user;

// Verify token coming through request header.
export const verifyEmailResendToken = async (req, res, next) => {
  const { emailResendToken } = req.body;

  if (!emailResendToken) {
    return res.status(400).send({ message: 'No token provided.' });
  }

  try {
    const decoded = verifyEmailToken(emailResendToken);
    if (!decoded) {
      return res.status(400).send({ message: 'Invalid or expired token.' });
    }

    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(404).send({ message: `Sorry! We don't recognize you.` });
    }

    if (user.is_active) {
      return res.status(400).send({ message: 'Your account is already verified.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Error resending verification email:', error);
    res.status(500).send({
      message: 'Error resending verification email. Please try again.'
    });
  }
};
