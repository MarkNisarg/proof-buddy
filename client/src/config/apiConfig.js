// Backend API Configuration.
const apiCondig = {
  apiBaseUrl: process.env.REACT_APP_BACKEND_API_BASE_URL || 'http://localhost:3001'
};

// Validate API configurations.
if (!apiCondig.apiBaseUrl) {
  console.error('Error: API configuration is not set.');
}

export default apiCondig;
