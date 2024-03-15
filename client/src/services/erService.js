import axiosInstanceProof from '../utils/axiosInstanceProof';
import { handleServiceError } from '../utils/serviceErrorHandling';

const API_GATEWAY = '/api/v1/proof'

/**
 * Check the proof goal.
 *
 * @param {Object} goal - The object contains proof goal.
 * @returns {Promise<Object>} - The response data from the server.
 */
const checkGoal = async (goal) => {
  try {
    const response = await axiosInstanceProof.post(`${API_GATEWAY}/check-goal`, goal);
    return response.data;
  } catch (error) {
    handleServiceError(error, 'Error during goal validation:');
    throw error;
  }
};

/**
 * Generate the racket for the provided rule.
 *
 * @param {Object} payLoad - The object contains proof rule & start position of highlight.
 * @returns {Promise<Object>} - The response data from the server.
 */
const racketGeneration = async (payLoad) => {
  try {
    const response = await axiosInstanceProof.post(`${API_GATEWAY}/er-generate`, payLoad);
    console.log(payLoad);
    return response.data;
  } catch (error) {
    handleServiceError(error, 'Error during racket generation:');
    throw error;
  }
};

const erService = {
  checkGoal,
  racketGeneration
};

export default erService;
