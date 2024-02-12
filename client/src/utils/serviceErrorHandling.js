import logger from './logger';

/**
 * Handles service layer errors, logging additional information if necessary.
 *
 * @param {Error} error - The error object.
 * @param {string} message - Custom error message for logging.
 */
const handleServiceError = (error, message) => {
  logger.error(message, error.response.data.message);
  if (!error.response) {
    logger.error('Network error or server is down.');
  }
};

export { handleServiceError };
