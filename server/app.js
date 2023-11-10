import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

// Middlewares.
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Welcome Route.
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ProofBuddy APIs' });
});

// Use Routes.
userRoutes(app);

export default app;
