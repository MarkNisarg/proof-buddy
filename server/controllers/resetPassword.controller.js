import userService from '../services/user.service.js';
import { respondWithError, respondWithSuccess } from '../utils/response.util.js';
import { isPasswordResetValid } from '../utils/validation.util.js';

/**
 * Reset user account password handler.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object
 * @returns {Promise} - A promise that resolves with the HTTP response object.
 */
const resetPassword = async (req, res) => {
  const { resetToken, password } = req.body;

  if (isPasswordResetValid(resetToken, password)) {
    return res.status(400).send({ message: 'Some error occured! Please try again later.' });
  }

  try {
    const user = req.user;

    const isPasswordSame = await userService.isPasswordValid(password, user);
    if (isPasswordSame) {
      return res.status(400).send({ message: 'New password must be different from previously used.' });
    }

    await userService.resetPassword(password, user);
    respondWithSuccess(res, 200, 'Password has been successfully reset.');
  } catch (err) {
    console.error('Error during password reset:', err);
    respondWithError(res, 500, 'Error resetting password. Please try again later.');
  }
};

export default resetPassword;
