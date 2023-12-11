import db from '../models/index.js';
import authConfig from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '../services/email.service.js';
import { generateVerificationToken, generateEmailResendToken } from '../utils/emailToken.util.js';

const User = db.user;

// Helper function for validating user input.
const validateUserInput = ({ username, email, password }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9@./+/-/_]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const isValidEmail = emailRegex.test(email);
  const isValidUsername = username && usernameRegex.test(username) && username.length <= 50;
  const isValidPassword = password && passwordRegex.test(password);

  return isValidEmail && isValidUsername && isValidPassword;
};

// Create user and send verification email.
const createUser = async (req, res) => {
  if (!validateUserInput(req.body)) {
    return res.status(400).send({ message: 'Invalid user data. Please enter valid data.' });
  }

  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      is_student: req.body.is_student || false,
      is_instructor: req.body.is_instructor || false,
      date_joined: new Date()
    });

    // Generate a verification token.
    const verificationToken = generateVerificationToken(user);

    // Send verification email.
    await sendVerificationEmail(user, verificationToken);
    const emailResendToken = generateEmailResendToken(user);

    res.status(201).send({
      message: 'User registered successfully. Please check your email to verify your account.',
      emailResendToken: emailResendToken
    });
  } catch (err) {
    res.status(500).send({ message: 'Error creating user account. Please try again.' });
  }
};

// Resend verification email handler.
const resendVerificationEmail = async (req, res) => {
  try {
    const user = req.user;

    const verificationToken = generateVerificationToken(user);
    await sendVerificationEmail(user, verificationToken);

    res.status(200).send({ message: 'Verification email resent successfully.' });
  } catch (err) {
    console.error('Error resending verification email:', err);
    res.status(500).send({ message: 'Error resending verification email. Please try again.' });
  }
};

// User sign-in handler.
const signin = async (req, res) => {
  try {
    // Validation of user input.
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'Username and password are required.' });
    }

    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      return res.status(404).send({ message: `Sorry! We don't recognize you.`});
    }

    if (!user.is_active) {
      const verificationToken = generateVerificationToken(user);
      await sendVerificationEmail(user, verificationToken);

      const emailResendToken = generateEmailResendToken(user);

      return res.status(403).send({
        message: 'Email not verified. Please verify email before logging in.',
        emailResendToken: emailResendToken
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid username or password.'
      });
    }

    const token = jwt.sign({ username: user.username }, authConfig.secret, {
      expiresIn: authConfig.jwtExpiration
    });

    res.status(200).send({
      username: user.username,
      email: user.email,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: 'Error logining user. Please try again later.' });
  }
};

// Get user profile data.
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.username } });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send({
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_student: user.is_student,
      is_instructor: user.is_instructor
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const userController = {
  createUser,
  resendVerificationEmail,
  signin,
  getUserProfile
};

export default userController;
