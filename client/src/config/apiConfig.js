import logger from '../utils/logger';

/**
 * Retrieves Node API base URL from environment variables with a fallback to a default value.
 * @returns {string} API Base URL.
 */
const getNodeApiBaseUrl = () => {
  const defaultUrl = 'http://localhost:3001';
  const envUrl = process.env.REACT_APP_NODE_BACKEND_API_BASE_URL;

  if (!envUrl) {
    logger.warn(`Node backend API base url is not set. Using default URL: ${defaultUrl}`);
  }

  return envUrl || defaultUrl;
};

/**
 * Retrieves Python API base URL from environment variables with a fallback to a default value.
 * @returns {string} API Base URL.
 */
const getPythonApiBaseUrl = () => {
  const defaultUrl = 'http://localhost:9095';
  const envUrl = process.env.REACT_APP_PYTHON_BACKEND_API_BASE_URL;

  if (!envUrl) {
    logger.warn(`Python backend API base url is not set. Using default URL: ${defaultUrl}`);
  }

  return envUrl || defaultUrl;
};

const apiConfig = {
  apiBaseUrl: getNodeApiBaseUrl(),
  proofApiBaseUrl: getPythonApiBaseUrl()
};

export default apiConfig;
