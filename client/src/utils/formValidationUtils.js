/**
 * Form validations.
 */

// Username validation regex.
const usernameRegex = /^[a-zA-Z0-9@./+/-/_]+$/;

// Email validation regex.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a username.
 *
 * @param {string} username - The username to validate.
 * @returns {string} An empty string if the username is valid, otherwise an error message.
 */
const validateUsername = (username) => {
  let errorMessage = '';
  if (!username) {
    errorMessage = 'Please provide a username.';
  } else if (username.length > 50) {
    errorMessage = 'Username must be 50 characters or fewer.';
  } else if (!usernameRegex.test(username)) {
    errorMessage = 'Username can only contain letters, digits, and @/./+/-/_ characters.';
  }

  return errorMessage;
};

/**
 * Validates an email address.
 *
 * @param {string} email - The email address to validate.
 * @returns {string} An empty string if the email is valid, otherwise an error message.
 */
const validateEmail = (email) => {
  return emailRegex.test(email) ? '' : 'Please provide a valid email address.';
};

/**
 * Validates a password.
 *
 * @param {string} password - The password to validate.
 * @returns {string} An empty string if the password is valid, otherwise an error message.
 */
const validatePassword = (password) => {
  let errorMessage = '';
  if (!password || password.length === 0) {
    errorMessage = 'Please provide a valid password.';
  } else if (password.length < 8) {
    errorMessage = 'Password must be at least 8 characters long.';
  } else if (!/\d/.test(password)) {
    errorMessage = 'Password must include a number.';
  } else if (!/[!@#$%^&*]/.test(password)) {
    errorMessage = 'Password must include a special character (!@#$%^&*).';
  }

  return errorMessage;
};

/**
 * Validates a confirm password field against the original password.
 *
 * @param {string} password - The original password.
 * @param {string} confirmPassword - The confirm password to validate.
 * @returns {string} An empty string if the passwords match, otherwise an error message.
 */
const validateConfirmPassword = (password, confirmPassword) => {
  let errorMessage = '';
  if (!confirmPassword || confirmPassword.length === 0) {
    errorMessage = 'Please provide a confirm password.';
  } else if (confirmPassword !== password) {
    errorMessage = 'Passwords do not match.';
  }

  return errorMessage;
};

/**
 * Validates a specific form field.
 *
 * @param {string} fieldName - The name of the field to validate.
 * @param {string} value - The value of the field to validate.
 * @param {Object} allValues - An object containing all form field values (needed for confirm password validation).
 * @returns {string} An empty string if the field is valid, otherwise an error message.
 */
const validateField = (fieldName, value, allValues) => {
  switch (fieldName) {
    case 'username':
      return validateUsername(value);
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    case 'confirmPassword':
      return validateConfirmPassword(allValues.password, value);
    default:
      return '';
  }
};

export default validateField;
