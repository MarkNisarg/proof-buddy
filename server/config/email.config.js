import dotenv from 'dotenv';

dotenv.config();

const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USERNAME,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: process.env.GMAIL_ACCESS_TOKEN
  }
};


// Validate essential email configuration.
if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.clientId || !EMAIL_CONFIG.auth.clientSecret || !EMAIL_CONFIG.auth.refreshToken || !EMAIL_CONFIG.auth.accessToken) {
  console.error('Fatal Error: Email configuration is incomplete.');
  process.exit(1);
}


export default EMAIL_CONFIG;
