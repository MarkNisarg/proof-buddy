import Cookies from 'js-cookie';
import axiosInstance from '../utils/axiosInstance';

const API_GATEWAY = '/api/v1/auth';

const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(`${API_GATEWAY}/signup`, userData);
    return response.data;
  } catch (error) {
    // TODO: Handle errors (network issues, server errors, etc.)
    console.error('Error during user registration:', error);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await axiosInstance.post(`${API_GATEWAY}/signin`, credentials);
    // TODO: Handle token storage and management here.
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

const verifyEmail = async (token) => {
  try {
    const response = await axiosInstance.post(`${API_GATEWAY}/verify-email`, { token });
    return response.data;
  } catch (error) {
    console.error('Error during email verification:', error);
    throw error;
  }
};

const resendVerificationEmail = async () => {
  try {
    const email = Cookies.get('email');
    if (!email) {
      throw new Error('User email is not available.');
    }

    const response = await axiosInstance.post(`${API_GATEWAY}/resend-verification`, { email });
    return response.data;
  } catch (error) {
    // TODO: Handle errors like network issues, server errors, etc.
    console.error('Error during resending verification email:', error);
    throw error;
  }
};

const AuthService = {
  registerUser,
  login,
  verifyEmail,
  resendVerificationEmail
};

export default AuthService;
