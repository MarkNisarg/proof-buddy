import jwt from 'jsonwebtoken';
import util from 'util';
import authConfig from '../config/auth.config.js';
import { respondWithError } from '../utils/response.util.js';

const promisifiedJwtVerify = util.promisify(jwt.verify);

/**
 * Extracts the token from the bearer header.
 *
 * @param {string} bearerHeader - The authorization header containing the token.
 * @returns {string|undefined} - The extracted token or undefined if not found.
 */
const extractToken = (bearerHeader) => {
  if (bearerHeader && bearerHeader.startsWith('Bearer ')) {
    return bearerHeader.split(' ')[1];
  }
};

/**
 * Middleware to verify the token provided in the request header.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the Express.js route.
 * @returns {Promise<void>} - A promise that resolves when the verification is complete or an error response is sent.
 */
const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  const bearerToken = extractToken(bearerHeader);
  if (!bearerToken) {
    return respondWithError(res, 403, 'A token is required for authentication.');
  }

  try {
    const decoded = await promisifiedJwtVerify(bearerToken, authConfig.secret);
    req.username = decoded.username;
    next();
  } catch (err) {
    respondWithError(res, 401, 'Unauthorized token provided. ' + err.message);
  }
};

export default verifyToken;
