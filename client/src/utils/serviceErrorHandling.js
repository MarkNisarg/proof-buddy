/**
 * Handles service layer errors, logging additional information if necessary.
 *
 * @param {Error} error - The error object.
 * @param {string} message - Custom error message for logging.
 */
const handleServiceError = (error, message) => {
  console.error(message, error);
  if (!error.response) {
    console.error('Network error or server is down.');
  }
};

export { handleServiceError };
