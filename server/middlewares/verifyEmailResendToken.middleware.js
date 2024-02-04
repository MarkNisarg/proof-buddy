import { verifyEmailToken } from '../utils/token.util.js';
import { respondWithError } from '../utils/response.util.js';
import userService from '../services/user.service.js';

/**
 * Middleware to verify the email resend token from the request body.
 *
 * @param {Object} req - The HTTP request object, containing the verification type and email resend token.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the Express.js route.
 * @returns {Promise<void>} - A promise that resolves when the verification is complete or an error response is sent.
 */
const verifyEmailResendToken = async (req, res, next) => {
  const { verificationType, emailResendToken } = req.body;

  if (!emailResendToken) {
    return respondWithError(res, 400, 'No token provided.');
  }

  try {
    const decoded = verifyEmailToken(emailResendToken);
    if (!decoded) {
      return respondWithError(res, 400, 'Invalid or expired token.');
    }

    const user = await userService.findUserByEmail(decoded.email);
    if (!user) {
      return respondWithError(res, 404, 'Sorry! We don\'t recognize you.');
    }

    const userIsActive = await userService.isUserActive(user);
    if (verificationType === 'signupVerify' && userIsActive) {
      return res.status(400).send({ message: 'Your account is already verified.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Error resending verification email:', error);
    respondWithError(res, 500, 'Error resending verification email. Please try again.');
  }
};

export default verifyEmailResendToken;
