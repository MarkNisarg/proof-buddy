/**
 * Utility functions for standardized API responses.
 */

/**
 * Sends a standardized success response to the client.
 *
 * @param {Object} res - The response object from Express.js.
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {string} message - A message describing the success.
 * @param {Object} [data={}] - Additional data to be sent in the response.
 */
const respondWithSuccess = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...data
  });
};

/**
 * Sends a standardized error response to the client.
 *
 * @param {Object} res - The response object from Express.js.
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {string} message - A message describing the error.
 * @param {Object} [data={}] - Additional data to be sent in the response.
 */
const respondWithError = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...data
  });
};

export { respondWithSuccess, respondWithError };
