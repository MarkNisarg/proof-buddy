import axiosInstanceProof from '../utils/axiosInstanceProof';

const API_GATEWAY = '/api/v1/proof'

const racketGeneration = async (rule) => {
  try {
    
    const response = await axiosInstanceProof.post(`${API_GATEWAY}/er-generate`, rule);
    console.log(response.data.racket);
    return response.data;
  } catch (error) {
    console.error('Error during generation:', error);
    if (!error.response) {
      console.error('Network error or server is down.');
    }
    throw error;
  }
};

export default racketGeneration;