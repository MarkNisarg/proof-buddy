import createTransporter from '../config/email.config.js';
import { verificationEmailTemplate, passwordResetEmailTemplate } from '../templates/emailTemplates.js';

/**
 * Send an email with specified configurations.
 *
 * @param {string} to - Recipient's email address.
 * @param {string} subject - Subject of the email.
 * @param {string} body - HTML content of the email.
 */
const sendEmail = async (to, subject, html) => {
  const transporter = await createTransporter();
  const mailConfigurations = {
    from: `"Proof Buddy" <${process.env.GMAIL_USERNAME}>`,
    to,
    subject,
    html
  };

  transporter.sendMail(mailConfigurations)
    .then(info => {
      console.log(`Email Sent Successfully: `, info);
    })
    .catch(error => {
      console.error(`Error Sending Email: `, error);
      return;
    });
};

/**
 * Sends a verification email to a user.
 *
 * @param {Object} user - The user object, containing at least the username and email.
 * @param {string} token - The verification token to be included in the email.
 */
const sendVerificationEmail = async (user, token) => {
  const htmlContent  = verificationEmailTemplate(user.username, token, process.env.FRONTEND_URL);
  await sendEmail(user.email, 'Confirm Your Email', htmlContent);
};

/**
 * Sends a password reset email to a user.
 *
 * @param {Object} user - The user object, containing at least the username and email.
 * @param {string} token - The password reset token to be included in the email.
 */
const sendPasswordResetEmail = async (user, token) => {
  const htmlContent  = passwordResetEmailTemplate(user.username, token, process.env.FRONTEND_URL);
  await sendEmail(user.email, 'Reset Your Password', htmlContent);
};

const emailService = {
  sendVerificationEmail,
  sendPasswordResetEmail
};

export default emailService;
