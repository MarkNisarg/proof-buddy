import dotenv from "dotenv";

dotenv.config();

const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
};

export default EMAIL_CONFIG;
