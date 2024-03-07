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
 * @param {Object} rule - The object contains proof rule.
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
  checkGoal,
  racketGeneration
};

export default erService;
