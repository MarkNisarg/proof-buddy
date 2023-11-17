import dotenv from 'dotenv';

dotenv.config();

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

export default DB_CONFIG;
