import axiosInstance from '../utils/axiosInstance';
import { handleServiceError } from '../utils/serviceErrorHandling';

const API_ENDPOINT = '/api/v1/users';

/**
 * Retrieves the profile information of the currently authenticated user.
 *
 * @returns {Promise<Object>} - The user's profile data as returned by the server.
 */
const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(`${API_ENDPOINT}/profile`);
    return response.data;
  } catch (error) {
    handleServiceError(error, 'Error fetching user profile:');
    throw error;
  }
};

const userService = {
  getUserProfile
};

export default userService;
