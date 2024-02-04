import emailService from '../services/email.service.js';
import { respondWithError, respondWithSuccess } from '../utils/response.util.js';
import { generateVerificationToken } from '../utils/token.util.js';

/**
 * Resend verification email.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object
 * @returns {Promise} - A promise that resolves with the HTTP response object.
 */
const resendVerificationEmail = async (req, res) => {
  try {
    const user = req.user;
    const verificationType = req.body.verificationType;

    const verificationToken = generateVerificationToken(user);

    if (verificationType === 'signupVerify') {
      await emailService.sendVerificationEmail(user, verificationToken);
    } else if (verificationType === 'forgotPassword') {
      await emailService.sendPasswordResetEmail(user, verificationToken);
    }

    respondWithSuccess(res, 200, 'Verification email resent successfully.');
  } catch (err) {
    console.error('Error resending verification email:', err);
    return respondWithError(res, 500, 'Error resending verification email. Please try again.');
  }
};

export default resendVerificationEmail;
