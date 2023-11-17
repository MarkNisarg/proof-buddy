import nodemailer from 'nodemailer';
import emailConfig from '../config/email.config.js';

const transporter = nodemailer.createTransport(emailConfig);

// Send verification email with generated token.
export const sendVerificationEmail = async (user, token) => {
  const mailConfigurations = {
    from: `"Proof Buddy" <${process.env.GMAIL_USERNAME}>`,
    to: user.email,
    subject: 'Confirm Your Email',
    html: `
      <p>Hello ${user.username}!</p>
      <p>Thank you for signing up to Proof Buddy! To get started please confirm your email address by visiting the following link:</p>
      <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}" target="_blank">${process.env.FRONTEND_URL}/verify-email?token=${token}</a>
      <p>Thank you,<br/>Proof Buddy Team</p>
    `
  };

  transporter.sendMail(mailConfigurations)
    .then(info => {
      console.log('Email Sent Successfully', info);
    })
    .catch(error => {
      console.error('Error sending email', error);
    });
};
