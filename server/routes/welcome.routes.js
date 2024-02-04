import express from 'express';

const router = express.Router();

/**
 * GET / home page.
 * This route sends a welcome message for the ProofBuddy APIs.
 */
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to ProofBuddy APIs' });
});

export { router };
