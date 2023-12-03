import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';

// Generate email token with username.
export const generateVerificationToken = (user) => {
  return jwt.sign({ username: user.username }, authConfig.secret, { expiresIn: '2h' });
};

export const generateEmailResendToken = (user) => {
  return jwt.sign({ email: user.email }, authConfig.secret, { expiresIn: '2h' });
}

// Verify email token.
export const verifyEmailToken = (token) => {
  try {
    return jwt.verify(token, authConfig.secret);
  } catch (error) {
    console.error('Token verification error:', error.message);
    return null;
  }
};
