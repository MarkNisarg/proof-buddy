import db from '../models/index.js';
import bcrypt from 'bcryptjs';

const User = db.user;

/**
 * Creates a new user in the database.
 *
 * @param {Object} userData - Contains user's details.
 * @returns {Promise<Object>} - The newly created user object.
 */
const createUser = async ({ username, email, password, is_student, is_instructor }) => {
  return await User.create({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    is_student: is_student || false,
    is_instructor: is_instructor || false,
    date_joined: new Date()
  });
};

/**
 * Finds a user by their username.
 *
 * @param {string} username - The username of the user to find.
 * @returns {Promise<Object|null>} - The user object if found, otherwise null.
 */
const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

/**
 * Finds a user by their email.
 *
 * @param {string} email - The email of the user to find.
 * @returns {Promise<Object|null>} - The user object if found, otherwise null.
 */
const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

/**
 * Validates a user's password.
 *
 * @param {string} password - The password to validate.
 * @param {Object} user - The user object.
 * @returns {Promise<boolean>} - True if the password is valid, otherwise false.
 */
const isPasswordValid = async (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

/**
 * Activates a user account.
 *
 * @param {Object} user - The user object to activate.
 * @returns {Promise<void>} - Indicates that the operation is complete.
 */
const activateUser = async (user) => {
  user.is_active = true;
  await user.save();
};

/**
 * Checks if a user account is active.
 *
 * @param {Object} user - The user object to check.
 * @returns {Promise<boolean>} - True if the user is active, otherwise false.
 */
const isUserActive = async (user) => {
  return user.is_active;
};

/**
 * Resets a user's password.
 *
 * @param {string} password - The new password.
 * @param {Object} user - The user object whose password is to be reset.
 * @returns {Promise<void>} - Indicates that the password has been reset.
 */
const resetPassword = async (password, user) => {
  user.password = bcrypt.hashSync(password, 10);
  await user.save();
};

const userService = {
  createUser,
  findUserByUsername,
  findUserByEmail,
  isPasswordValid,
  activateUser,
  isUserActive,
  resetPassword
};

export default userService;
