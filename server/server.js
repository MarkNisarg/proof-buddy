import app from './app.js'
import db from './models/index.js'
import { startDatabase } from './config/db.config.js';

const PORT = process.env.PORT || 3001;

/**
 * Function to start the server.
 */
const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log('----------------------------------');
    console.log(`Server is running on port ${PORT}.`);
    console.log('----------------------------------');
  });

  // Handle server errors.
  server.on('error', (error) => {
    console.error('Error starting server:', error);
    process.exit(1);
  });

  /**
   * Graceful shutdown.
   */
  const gracefulShutdown = () => {
    console.log('Gracefully shutting down!');
    server.close(() => {
      db.sequelize.close().then(() => {
        console.log('Database connection closed.');
        process.exit(0);
      });
    });
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
};

// Start database connection and then the server.
startDatabase(db)
  .then(() => {
    console.log('Database connected and synced successfully.');
    startServer();
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });
