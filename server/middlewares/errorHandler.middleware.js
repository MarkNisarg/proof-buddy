import logger from '../config/logger.config.js';
import { respondWithError } from '../utils/response.util.js';

/**
 * Global error handling middleware for Express.js applications.
 *
 * @param {Object} err - The error object that was thrown.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const errorHandler = (err, req, res, next) => {
  logger.error(`Global server error: ${err.stack}`);

  respondWithError(res, 500, 'Internal Server Error', {
    stack: err.stack
  });
};

export default errorHandler;
