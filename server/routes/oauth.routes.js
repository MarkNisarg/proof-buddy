import express from 'express';

const router = express.Router();

/**
 * GET /OAuth2 callback route.
 * This route is triggered after the OAuth2 authentication process.
 */
router.get('/auth/google/callback', (req, res) => {
  res.json({ message: 'This is OAuth Callback endpoint' });
});

export { router };
