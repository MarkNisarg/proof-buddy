import axiosInstanceProof from '../utils/axiosInstanceProof';
import { handleServiceError } from '../utils/serviceErrorHandling';

const API_GATEWAY = '/api/v1/proof'

/**
 * Generate the racket for the provided rule.
 *
 * @param {string} rule - The proof rule.
 * @returns {Promise<Object>} - The response data from the server.
 */
const racketGeneration = async (rule) => {
  try {
    const response = await axiosInstanceProof.post(`${API_GATEWAY}/er-generate`, rule);
    return response.data;
  } catch (error) {
    handleServiceError(error, 'Error during racket generation:');
    throw error;
  }
};

const erService = {
  racketGeneration
};

export default erService;
