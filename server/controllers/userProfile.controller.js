import logger from '../config/logger.config.js';
import userService from '../services/user.service.js';
import { respondWithError, respondWithSuccess } from '../utils/response.util.js';

/**
 * Get user profile data.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object
 * @returns {Promise} - A promise that resolves when the response is sent.
 */
const getUserProfile = async (req, res) => {
  try {
    const user = await userService.findUserByUsername(req.username);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    respondWithSuccess(res, 200, '', {
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_student: user.is_student,
      is_instructor: user.is_instructor
    });
  } catch (err) {
    logger.error(`Error getting use profile: ${err}`);
    respondWithError(res, 500, err.message);
  }
};

export default getUserProfile;
