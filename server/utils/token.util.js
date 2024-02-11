import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';
import logger from '../config/logger.config.js';

/**
 * Generates a JWT for user verification, embedding the user's username.
 *
 * @param {Object} user - The user object containing the username.
 * @returns {string} - A JWT string that expires in 2 hours.
 */
const generateVerificationToken = (user) => {
  return jwt.sign({ username: user.username }, authConfig.secret, { expiresIn: '2h' });
};

/**
 * Generates a JWT specifically for email verification purposes, embedding the user's email.
 *
 * @param {Object} user - The user object containing the email.
 * @returns {string} - A JWT string that expires in 2 hours.
 */
const generateEmailResendToken = (user) => {
  return jwt.sign({ email: user.email }, authConfig.secret, { expiresIn: '2h' });
}

/**
 * Verifies the provided email token.
 *
 * @param {string} token - The JWT string to be verified.
 * @returns {Object | null} - The decoded token if verification is successful, otherwise null.
 */
const verifyEmailToken = (token) => {
  try {
    return jwt.verify(token, authConfig.secret);
  } catch (err) {
    logger.error(`Token verification error: ${err}`);
    return null;
  }
};

export { generateVerificationToken, generateEmailResendToken, verifyEmailToken };
