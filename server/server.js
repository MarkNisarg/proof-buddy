import app from './app.js'
import db from './models/index.js'
import { startDatabase } from './config/db.config.js';
import logger from './config/logger.config.js';

const PORT = process.env.PORT || 3001;

/**
 * Function to start the server.
 */
const startServer = () => {
  const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}.`);
  });

  // Handle server errors.
  server.on('error', (err) => {
    logger.error(`Error starting server: ${err}`);
    process.exit(1);
  });

  /**
   * Graceful shutdown.
   */
  const gracefulShutdown = () => {
    logger.warn('Gracefully shutting down!!!');
    server.close(() => {
      db.sequelize.close().then(() => {
        logger.info('Database connection closed.');
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
    logger.info('Database connected and synced successfully.');
    startServer();
  })
  .catch(err => {
    logger.error(`Error connecting to database: ${err}`);
  });
