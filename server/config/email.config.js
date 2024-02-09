import dotenv from 'dotenv';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

dotenv.config();

const OAuth2 = google.auth.OAuth2;

/**
 * Create a new OAuth2 client with the credentials.
 */
const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'http://localhost:3001/api/v1/auth/google/callback'
);

/**
 * Set the OAuth2 client credentials.
 */
oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

/**
 * Create a transporter using OAuth2 authentication.
 */
const createTransporter = async () => {
  try {
    const accessTokenInfo = await oauth2Client.getAccessToken();
    if (!accessTokenInfo.token) {
      throw new Error('Failed to create access token.');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USERNAME,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessTokenInfo.token
      }
    });

    return transporter;
  } catch (error) {
    console.error('Error creating transporter: ', error);
    throw error;
  }
};

/**
 * Validate essential email configuration.
 */
if (!process.env.GMAIL_USERNAME || !process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET || !process.env.GMAIL_REFRESH_TOKEN) {
  console.error('Fatal Error: Email configuration is incomplete.');
  process.exit(1);
}

export default createTransporter;
