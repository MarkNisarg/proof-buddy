import axiosInstance from '../utils/axiosInstance';

const API_GATEWAY = '/api/v1/users';

const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(`${API_GATEWAY}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    if (!error.response) {
      console.error('Network error or server is down.');
    }
    throw error;
  }
};

const UserService = {
  getUserProfile
};

export default UserService;
