import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import verificationRoutes from './routes/verification.routes.js';
import profileRoutes from './routes/profile.routes.js';
import { router as welcomeRouter } from './routes/welcome.routes.js';
import { router as oauthRouter } from './routes/oauth.routes.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import morganAPILogger from './middlewares/morgan.middleware.js';

dotenv.config();

const app = express();

// Middlewares.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply Morgan middleware configuration.
morganAPILogger(app);

// API Versioning.
const apiVersion = '/api/v1';

// Welcome Route.
app.use(`${apiVersion}/`, welcomeRouter);

// OAuth2 Callback Route.
app.use(`${apiVersion}/`, oauthRouter);

// Auth Routes.
app.use(`${apiVersion}/auth`, authRoutes);

// Verification Routes.
app.use(`${apiVersion}/auth`, verificationRoutes);

// Profile Routes.
app.use(`${apiVersion}/users`, profileRoutes);

// Global error handling middleware.
app.use(errorHandler);

export default app;
