import dotenv from 'dotenv';

dotenv.config();

const authConfig = {
  secret: process.env.JWT_SECRET,
  jwtExpiration: parseInt(process.env.JWT_EXPIRATION, 10) || 86400
};

if (!authConfig.secret) {
  console.error('Fatal Error: JWT secret is not defined.');
  process.exit(1);
}

export default authConfig;
