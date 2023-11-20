import axiosInstance from '../utils/axiosInstance';

const API_GATEWAY = '/api/v1/users';

const UserService = {
  getProfile: async () => {
    try {
      const response = await axiosInstance.get(`${API_GATEWAY}/profile`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
};

export default UserService;
