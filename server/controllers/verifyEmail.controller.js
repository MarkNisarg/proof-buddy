import { verifyEmailToken } from '../utils/token.util.js';
import { respondWithError, respondWithSuccess } from '../utils/response.util.js';
import userService from '../services/user.service.js';

/**
 * Verify an email using token verification.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object
 * @returns {Promise} - A promise that resolves with the HTTP response object.
 */
const verifyEmail = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return respondWithError(res, 400, 'No token provided.');
  }

  try {
    const decoded = verifyEmailToken(token);
    if (!decoded) {
      return respondWithError(res, 400, 'Invalid or expired token.');
    }

    const user = await userService.findUserByUsername(decoded.username);
    if (!user) {
      return respondWithError(res, 404, 'Sorry! We don\'t recognize you.');
    }

    const userIsActive = await userService.isUserActive(user);
    if (userIsActive) {
      return respondWithError(res, 400, 'User has already been verified. Please Log In.');
    }

    await userService.activateUser(user);
    respondWithSuccess(res, 200, 'Account verified successfully!');
  } catch (error) {
    console.log(error);
    respondWithError(res, 500, 'Failed to verify account.');
  }
};

export default verifyEmail;
