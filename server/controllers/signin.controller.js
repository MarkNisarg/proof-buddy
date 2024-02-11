import authConfig from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import limiter from '../middlewares/rateLimit.middleware.js';
import emailService from '../services/email.service.js';
import { generateVerificationToken, generateEmailResendToken } from '../utils/token.util.js';
import { validateCredentials } from '../utils/validation.util.js';
import { respondWithError, respondWithSuccess } from '../utils/response.util.js';
import userService from '../services/user.service.js';
import logger from '../config/logger.config.js';

/**
 * The user sign-in process handler.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object
 * @returns {Promise} - A promise that resolves with the HTTP response object.
 */
const signin = async (req, res) => {
  try {
    if (!validateCredentials(req.body)) {
      return respondWithError(res, 400, 'Invalid username or password.');
    }

    const user = await userService.findUserByUsername(req.body.username);
    if (!user) {
      return respondWithError(res, 404, 'Sorry! We don\'t recognize you.');
    }

    // If user is not active then send verification email.
    const userIsActive = await userService.isUserActive(user);
    if (!userIsActive) {
      const verificationToken = generateVerificationToken(user);
      await emailService.sendVerificationEmail(user, verificationToken);

      const emailResendToken = generateEmailResendToken(user);

      return respondWithError(res, 403,
        'Email not verified. Please verify email before logging in.',
        { emailResendToken }
      );
    }

    const isPasswordValid = await userService.isPasswordValid(req.body.password, user);
    if (!isPasswordValid) {
      return respondWithError(res, 401,
        'Invalid username or password.',
        { accessToken: null }
      );
    }

    const token = jwt.sign({ username: user.username }, authConfig.secret, {
      expiresIn: authConfig.jwtExpiration
    });

    // Reset the limiter on successful authentication.
    const limiterKey = req.ip;
    limiter.loginAttemptLimiter.resetKey(limiterKey);

    respondWithSuccess(res, 200, 'Credentials verifided! Success!', {
      username: user.username,
      email: user.email,
      accessToken: token
    });

  } catch (err) {
    logger.error(`Error logining user: ${err}`);
    return respondWithError(res, 500, 'Error logining user. Please try again later.');
  }
};

export default signin;
