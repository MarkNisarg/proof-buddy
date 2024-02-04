import dotenv from 'dotenv';

dotenv.config();

/**
 * DB_HOST, DB_USER, DB_PASSWORD, DB_NAME,
 * DB_DIALECT: Database configurartions.
 */
const DB_CONFIG = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  DIALECT: process.env.DB_DIALECT || 'mysql'
};

// Validating essential database configuration.
if (!DB_CONFIG.HOST || !DB_CONFIG.USER || DB_CONFIG.PASSWORD === undefined || !DB_CONFIG.DB) {
  console.error('Fatal Error: Database configuration is incomplete.');
  process.exit(1);
}

/**
 * Start the database connection.
 *
 * @param {Object} db - Database object.
 */
const startDatabase = async (db) => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await db.sequelize.sync({ force: false });
    console.log('Database synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export { DB_CONFIG, startDatabase };
