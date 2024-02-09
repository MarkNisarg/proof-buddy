import emailService from '../services/email.service.js';
import { generateVerificationToken, generateEmailResendToken } from '../utils/token.util.js';
import { validateUserInput } from '../utils/validation.util.js';
import { respondWithError, respondWithSuccess } from '../utils/response.util.js';
import userService from '../services/user.service.js';

/**
 * Create user account and send verification email.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object
 * @returns {Promise} - A promise that resolves with the HTTP response object.
 */
const createUser = async (req, res) => {
  if (!validateUserInput(req.body)) {
    return respondWithError(res, 400, 'Invalid user data. Please enter valid data.');
  }

  try {
    const user = await userService.createUser({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      is_student: req.body.is_student,
      is_instructor: req.body.is_instructor
    });

    const verificationToken = generateVerificationToken(user);
    await emailService.sendVerificationEmail(user, verificationToken);

    const emailResendToken = generateEmailResendToken(user);

    respondWithSuccess(res, 201,
      'User registered successfully. Please check your email to verify your account.',
      { emailResendToken }
    );
  } catch (err) {
    return respondWithError(res, 500, 'Error creating user account. Please try again.');
  }
};

export default createUser;
