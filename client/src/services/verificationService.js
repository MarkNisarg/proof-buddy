import Cookies from 'js-cookie';
import axiosInstance from '../utils/axiosInstance';
import { handleServiceError } from '../utils/serviceErrorHandling';

const API_ENDPOINT = '/api/v1/auth';

/**
 * Verifies the user's email by sending the verification token to the server.
 *
 * @param {string} token - The email verification token.
 * @returns {Promise<Object>} - An object indicating the success or failure of the email verification.
 */
const verifyEmail = async (token) => {
  try {
    const response = await axiosInstance.post(`${API_ENDPOINT}/verify-email`, { token });
    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Email verification failed. Please try again.' };
    }
  } catch (error) {
    handleServiceError(error, 'Error during email verification:');
    throw error;
  }
};

/**
 * Resends the verification email to the user.
 *
 * @param {string} verificationType - The type of verification being requested.
 * @returns {Promise<Object>} - The server's response, typically a success message or error.
 */
const resendVerificationEmail = async (verificationType) => {
  try {
    const emailResendToken = Cookies.get('emailResendToken');
    if (!emailResendToken) {
      throw new Error('User email could not found.');
    }

    const response = await axiosInstance.post(`${API_ENDPOINT}/resend-verification`, {
      verificationType,
      emailResendToken
    });

    return response.data;
  } catch (error) {
    handleServiceError(error, 'Error during resending verification email:');
    throw error;
  }
};

const verificationService = {
  verifyEmail,
  resendVerificationEmail
};

export default verificationService;
