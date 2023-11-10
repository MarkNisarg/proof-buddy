import nodemailer from 'nodemailer';
import emailConfig from '../config/email.config.js';

const transporter = nodemailer.createTransport(emailConfig);

// Send verification email with generated token.
export const sendVerificationEmail = async (user, token) => {
  const mailConfigurations = {
    from: 'your-email@gmail.com',
    to: user.email,
    subject: 'Email Verification',
    text: `Verify your email by clicking on this link: ${process.env.FRONTEND_URL}/verify-email?token=${token}`
  };

  transporter.sendMail(mailConfigurations)
  .then(info => {
    console.log('Email Sent Successfully', info);
  })
  .catch(error => {
    console.error('Error sending email', error);
  });
};
