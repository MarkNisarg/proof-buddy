import logger from '../config/logger.config.js';
import userService from '../services/user.service.js';
import { respondWithError } from '../utils/response.util.js';

/**
 * Checks if the provided username already exists in the database.
 *
 * @param {string} username - The username to check for duplication.
 * @returns {Promise<boolean>} - True if the username exists, otherwise false.
 */
const checkDuplicateUsername = async (username) => {
  return await userService.findUserByUsername(username)
};

/**
 * Checks if the provided email already exists in the database.
 *
 * @param {string} email - The email to check for duplication.
 * @returns {Promise<boolean>} - True if the email exists, otherwise false.
 */
const checkDuplicateEmail = async (email) => {
  return await userService.findUserByEmail(email)
};

/**
 * Middleware to check for duplicate username or email during user registration.
 *
 * @param {Object} req - The HTTP request object, containing the username and email.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the Express.js route.
 * @returns {Promise<void>} - A promise that resolves when the check is complete or an error response is sent.
 */
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    if (await checkDuplicateUsername(req.body.username)) {
      return respondWithError(res, 400, 'Username is already exists. Try another?');
    }

    if (await checkDuplicateEmail(req.body.email)) {
      return respondWithError(res, 400, 'Email is already exists. Try another?');
    }

    next();
  } catch (err) {
    logger.error(`Error verifying sign-up information: ${err}`);
    respondWithError(res, 500, 'Error verifying sign-up information.');
  }
};

export default checkDuplicateUsernameOrEmail;
