import dotenv from 'dotenv';

dotenv.config();

export default {
  secret: process.env.JWT_SECRET,
  jwtExpiration: parseInt(process.env.JWT_EXPIRATION, 10),
};
