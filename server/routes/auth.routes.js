import express from 'express';
import limiter from '../middlewares/rateLimit.middleware.js';
import createUser from '../controllers/signup.controller.js';
import checkDuplicateUsernameOrEmail from '../middlewares/verifySignUp.middleware.js';
import signin from '../controllers/signin.controller.js';
import verifyPasswordResetEmail from '../middlewares/verifyPasswordResetEmail.middleware.js';
import verifyPasswordResetToken from '../middlewares/verifyPasswordResetToken.middleware.js';
import forgotPassword from '../controllers/forgotPassword.controller.js';
import resetPassword from '../controllers/resetPassword.controller.js';

const router = express.Router();

/**
 * POST /signup
 * Route for user registration.
 */
router.post('/signup', checkDuplicateUsernameOrEmail, createUser);

/**
 * POST /signin
 * Route for user login.
 */
router.post('/signin', limiter.loginAttemptLimiter, signin);

/**
 * POST /forgot-password
 * Route for initiating a password reset process.
 */
router.post('/forgot-password', [verifyPasswordResetEmail, limiter.sendEmailLimiter], forgotPassword);

/**
 * POST /reset-password
 * Route for resetting the user's password.
 */
router.post('/reset-password', [verifyPasswordResetToken], resetPassword);

export default router;
