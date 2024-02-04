/**
 * General validations.
 */

// Email validation regex.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Username validation regex.
const usernameRegex = /^[a-zA-Z0-9@./+/-/_]+$/;

// Password validation regex.
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

/**
 * Validates user input for the signup process.
 *
 * @param {Object} userData - An object containing username, email, and password.
 * @returns {boolean} - True if all inputs are valid, otherwise false.
 */
const validateUserInput = ({ username, email, password }) => {
  const isValidEmail = emailRegex.test(email);
  const isValidUsername = username && usernameRegex.test(username) && username.length <= 50;
  const isValidPassword = password && passwordRegex.test(password);

  return isValidEmail && isValidUsername && isValidPassword;
};

/**
 * Validates user credentials for the signin process.
 *
 * @param {Object} credentials - An object containing username and password.
 * @returns {boolean} - True if both username and password are valid, otherwise false.
 */
const validateCredentials = ({ username, password }) => {
  const isValidUsername = username && usernameRegex.test(username) && username.length <= 50;
  const isValidPassword = password && passwordRegex.test(password);

  return isValidUsername && isValidPassword;
};

/**
 * Validates the reset token and new password for password reset.
 *
 * @param {Object} Object - An object containing the reset token and new password.
 * @returns {boolean} - True if the reset token is valid and the new password meets criteria, otherwise false.
 */
const isPasswordResetValid = ({ resetToken, password }) => {
  const isValidResetToken = !!resetToken;
  const isValidPassword = password && passwordRegex.test(password);

  return isValidResetToken && isValidPassword;
};

export { validateUserInput, validateCredentials, isPasswordResetValid };
