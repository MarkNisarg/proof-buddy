import axios from 'axios';
import apiCondig from '../config/apiConfig'
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: apiCondig.apiBaseUrl
});

// Request interceptor for API calls.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // TODO: Handle 401 error globally, e.g., redirecting to login or refreshing the token.
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
