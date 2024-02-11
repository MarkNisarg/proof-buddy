import logger from '../config/logger.config.js';
import emailService from '../services/email.service.js';
import { respondWithError, respondWithSuccess } from '../utils/response.util.js';
import { generateEmailResendToken, generateVerificationToken } from '../utils/token.util.js';

/**
 * Forgot user account password handler.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object
 * @returns {Promise} - A promise that resolves with the HTTP response object.
 */
const forgotPassword = async (req, res) => {
  try {
    const user = req.user;
    const resetToken = generateVerificationToken(user);
    await emailService.sendPasswordResetEmail(user, resetToken);

    const emailResendToken = generateEmailResendToken(user);

    respondWithSuccess(res, 200,
      'Password reset email sent successfully.',
      { emailResendToken }
    );
  } catch (err) {
    logger.error(`Error during password reset request: ${err}`);
    return respondWithError(res, 500, 'Error processing your request. Please try again later.');
  }
};

export default forgotPassword;
