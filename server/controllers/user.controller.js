import db from '../models/index.js';
import authConfig from '../config/auth.config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '../services/email.service.js';
import { generateVerificationToken } from '../utils/emailToken.util.js';

const User = db.user;

// Helper function for validating user input.
const validateUserInput = ({ username, email, password }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  const isValidUsername = username && username.trim() !== '';
  const isValidPassword = password && password.length >= 8;

  return isValidEmail && isValidUsername && isValidPassword;
};

// Create user and send verification email.
const createUser = async (req, res) => {
  if (!validateUserInput(req.body)) {
    return res.status(400).send({ message: 'Invalid input data' });
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

    res.send({ message: 'User registered successfully! Please check your email to verify your account.' });
  } catch (err) {
    res.status(500).send({ message: 'Error creating user.' });
  }
};

// User sign-in handler.
const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    if (!user.is_active) {
      return res.status(404).send({ message: 'Email not verified. Please verify email first then proceed with login.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
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
    res.status(500).send({ message: 'Error logining user.' });
  }
};

// Get user profile data.
const profile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }
    res.status(200).send({
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      is_student: user.is_student,
      is_instructor: user.is_instructor,
      is_superuser: user.is_superuser,
      is_staff: user.is_staff,
      is_active: user.is_active
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const userController = {
  createUser,
  signin,
  profile
};

export default userController;
