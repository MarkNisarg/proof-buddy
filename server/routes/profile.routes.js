import express from 'express';
import verifyToken from '../middlewares/authenticateToken.middleware.js';
import getUserProfile from '../controllers/userProfile.controller.js';

const router = express.Router();

/**
 * GET /profile
 * Route to retrieve the profile data of a user.
 */
router.get('/profile', [verifyToken], getUserProfile);

export default router;
