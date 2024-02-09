/**
 * Retrieves API base URL from environment variables with a fallback to a default value.
 * @returns {string} API Base URL.
 */
const getApiBaseUrl = () => {
  const defaultUrl = 'http://localhost:3001';
  const envUrl = process.env.REACT_APP_BACKEND_API_BASE_URL;

  if (!envUrl) {
    console.warn(`Warning: REACT_APP_BACKEND_API_BASE_URL is not set. Using default URL: ${defaultUrl}`);
  }

  return envUrl || defaultUrl;
};

const apiConfig = {
  apiBaseUrl: getApiBaseUrl(),
  proofApiBaseUrl: 'http://localhost:9095'
};

export default apiConfig;
