import dotenv from 'dotenv';

dotenv.config();

/**
 * JWT_SECRET: Secret key for signing JWTs, must be kept secure.
 * JWT_EXPIRATION: Time in seconds for JWT expiration, defaults to 24 hours.
 */
const authConfig = {
  secret: process.env.JWT_SECRET,
  jwtExpiration: parseInt(process.env.JWT_EXPIRATION, 10) || 86400
};

// Validating essential authentication configuration.
if (!authConfig.secret) {
  console.error('Fatal Error: JWT secret is not defined.');
  process.exit(1);
}

export default authConfig;
