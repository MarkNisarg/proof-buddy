import Cookies from 'js-cookie';
import axiosInstance from '../utils/axiosInstance';
import { handleServiceError } from '../utils/serviceErrorHandling';

const API_ENDPOINT = '/api/v1/auth';

/**
 * Registers a new user with the provided user data.
 *
 * @param {Object} userData - The data for the new user.
 * @returns {Promise<Object>} - The response data from the server.
 */
const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(`${API_ENDPOINT}/signup`, userData);
    return response.data;
  } catch (error) {
    handleServiceError(error, 'Error during user registration:');
    throw error;
  }
};

/**
 * Logs in a user with the provided credentials.
 *
 * @param {Object} credentials - The login credentials.
 * @returns {Promise<Object>} - The response data from the server.
 */
const login = async (credentials) => {
  try {
    const response = await axiosInstance.post(`${API_ENDPOINT}/signin`, credentials);
    return response.data;
  } catch (error) {
    handleServiceError(error, 'Error during login:');
    throw error;
  }
};

/**
 * Initiates a password reset process for the user with the given email.
 *
 * @param {string} email - The email of the user.
 * @returns {Promise<Object>} - The response data from the server.
 */
const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post(`${API_ENDPOINT}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    handleServiceError(error, 'Error during password reset request:');
    throw error;
  }
};

/**
 * Resets the user's password using a reset token and the new password.
 *
 * @param {string} resetToken - The token used to validate the password reset request.
 * @param {string} password - The new password for the user.
 * @returns {Promise<Object>} - An object indicating the success or failure.
 */
const resetPassword = async (resetToken, password) => {
  try {
    const response = await axiosInstance.post(`${API_ENDPOINT}/reset-password`, { resetToken, password });
    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Password reset failed. Please try again.' };
    }
  } catch (error) {
    handleServiceError(error, 'Error during password reset:');
    throw error;
  }
};

/**
 * Checks if the user is currently authenticated.
 *
 * @returns {boolean} - True if the user has an access token (is authenticated), otherwise false.
 */
const isAuthenticated = () => {
  return Cookies.get('accessToken') ? true : false;
};

const authService = {
  registerUser,
  login,
  forgotPassword,
  resetPassword,
  isAuthenticated
};

export default authService;
