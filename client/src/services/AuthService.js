import Cookies from 'js-cookie';
import axiosInstance from '../utils/axiosInstance';

const API_GATEWAY = '/api/v1/auth';

const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(`${API_GATEWAY}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    if (!error.response) {
      console.error('Network error or server is down.');
    }
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await axiosInstance.post(`${API_GATEWAY}/signin`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    if (!error.response) {
      console.error('Network error or server is down.');
    }
    throw error;
  }
};

const verifyEmail = async (token) => {
  try {
    const response = await axiosInstance.post(`${API_GATEWAY}/verify-email`, { token });
    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Email verification failed. Please try again.' };
    }
  } catch (error) {
    console.error('Error during email verification:', error);
    if (!error.response) {
      console.error('Network error or server is down.');
    }
    throw error;
  }
};

const resendVerificationEmail = async () => {
  try {
    const emailResendToken = Cookies.get('emailResendToken');
    if (!emailResendToken) {
      throw new Error('User email could not found.');
    }

    const response = await axiosInstance.post(`${API_GATEWAY}/resend-verification`, { emailResendToken });
    return response.data;
  } catch (error) {
    console.error('Error during resending verification email:', error);
    if (!error.response) {
      console.error('Network error or server is down.');
    }
    throw error;
  }
};

const isAuthenticated = () => {
  return Cookies.get('accessToken') ? true : false;
};

const AuthService = {
  registerUser,
  login,
  verifyEmail,
  resendVerificationEmail,
  isAuthenticated
};

export default AuthService;
