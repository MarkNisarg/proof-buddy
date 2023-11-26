import { authenticateToken } from '../middlewares/authenticateToken.middleware.js';
import { verifySignUp } from '../middlewares/verifySignUp.middleware.js';
import userController from '../controllers/user.controller.js';
import { verifyEmail } from '../controllers/verifyEmail.controller.js';

const userRoutes = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept'
    );
    next();
  });

  // Create user account endpoint.
  app.post(
    '/api/v1/auth/signup',
    [verifySignUp.checkDuplicateUsernameOrEmail],
    userController.createUser
  );

  // Email veification endpoint.
  app.post('/api/v1/auth/verify-email', verifyEmail);

  // Resend email veification endpoint.
  app.post('/api/v1/auth/resend-verification', userController.resendVerificationEmail);

  // Signin endpoint.
  app.post('/api/v1/auth/signin', userController.signin);

  // Signout endpoint.
  app.post('/api/v1/auth/signout', userController.signout);

  // Get user data endpoint.
  app.get(
    '/api/v1/users/profile',
    [authenticateToken.verifyToken],
    userController.profile
  );
};

export default userRoutes;
