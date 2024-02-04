import { verifyEmailToken } from '../utils/token.util.js';
import { respondWithError } from '../utils/response.util.js';
import userService from '../services/user.service.js';

/**
 * Middleware to verify the password reset token received in the request body.
 *
 * @param {Object} req - The HTTP request object, containing the reset token.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the Express.js route.
 * @returns {Promise<void>} - A promise that resolves when the token verification is complete or an error response is sent.
 */
const verifyPasswordResetToken = async (req, res, next) => {
  const { resetToken } = req.body;

  if (!resetToken) {
    return respondWithError(res, 400, 'No token provided.');
  }

  try {
    const decoded = verifyEmailToken(resetToken);
    if (!decoded) {
      return respondWithError(res, 400, 'Invalid or expired token.');
    }

    const user = await userService.findUserByUsername(decoded.username);
    if (!user) {
      return respondWithError(res, 404, 'Sorry! We don\'t recognize you.');
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Error resending verification email:', error);
    respondWithError(res, 500, 'Error resending verification email. Please try again.');
  }
};

export default verifyPasswordResetToken;
