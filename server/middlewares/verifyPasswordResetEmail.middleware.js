import userService from '../services/user.service.js';
import { respondWithError } from '../utils/response.util.js';

/**
 * Middleware to verify the email provided in the password reset request.
 *
 * @param {Object} req - The HTTP request object, containing the email for password reset.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the Express.js route.
 * @returns {Promise<void>} - A promise that resolves when the user is verified or an error response is sent.
 */
const verifyPasswordResetEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return respondWithError(res, 400, 'No email provided.');
  }

  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return respondWithError(res, 400, 'Sorry! We don\'t recognize you.');
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Error sending password reset email:', error);
    respondWithError(res, 500, 'Error sending password reset email. Please try again.');
  }
};

export default verifyPasswordResetEmail;
