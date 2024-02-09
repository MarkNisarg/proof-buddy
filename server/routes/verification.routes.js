import express from 'express';
import verifyEmailResendToken from '../middlewares/verifyEmailResendToken.middleware.js';
import verifyEmail from '../controllers/verifyEmail.controller.js';
import limiter from '../middlewares/rateLimit.middleware.js';
import resendVerificationEmail from '../controllers/resendVerificationEmail.controller.js';

const router = express.Router();

/**
 * POST /verify-email
 * Route for verifying a user's email address.
 */
router.post('/verify-email', verifyEmail);

/**
 * POST /resend-verification
 * Route for resending the verification link.
 */
router.post('/resend-verification', [verifyEmailResendToken, limiter.sendEmailLimiter], resendVerificationEmail);

export default router;
