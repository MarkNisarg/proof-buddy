import axiosInstanceProof from '../utils/axiosInstanceProof';

const API_GATEWAY = '/api/v1/proof'

const generateExpression = async () => {
  try {
    
    const response = await axiosInstanceProof.post(`${API_GATEWAY}/er-generate`, {name:'John', age:31, city:'New York'}) ;
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error during generation:', error);
    if (!error.response) {
      console.error('Network error or server is down.');
    }
    throw error;
  }
};

export default generateExpression;