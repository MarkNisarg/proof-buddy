import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

// Middlewares.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome Route.
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ProofBuddy APIs' });
});

app.get('/oauth2callback', (req, res) => {
  res.json({ message: 'This is OAuth Callback endpoint' });
});

// Use Routes.
userRoutes(app);

// Global error handling middleware.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Internal Server Error' });
});

export default app;
