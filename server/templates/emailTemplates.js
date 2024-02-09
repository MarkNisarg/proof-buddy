/**
 * Generates HTML for the verification email.
 *
 * @param {string} username - User's username.
 * @param {string} token - Verification token.
 * @param {string} frontendUrl - The frontend URL.
 * @returns {string} - HTML content for the email.
 */
export const verificationEmailTemplate = (username, token, frontendUrl) => {
  return `
      <p>Hello ${username}!</p>
      <p>Thank you for signing up to Proof Buddy! To get started please confirm your email address by visiting the following link:</p>
      <a href="${frontendUrl}/verify-email?token=${token}" target="_blank">${frontendUrl}/verify-email?token=${token}</a>
      <p>Thank you,<br/>Proof Buddy Team</p>
  `;
};

/**
* Generates HTML for the password reset email.
*
* @param {string} username - User's username.
* @param {string} token - Password reset token.
* @param {string} frontendUrl - The frontend URL.
* @returns {string} - HTML content for the email.
*/
export const passwordResetEmailTemplate = (username, token, frontendUrl) => {
  return `
      <p>Hello ${username}!</p>
      <p>We've received a request to reset the password of the account associated with this email. You can do so using the following link:</p>
      <a href="${frontendUrl}/reset-password?token=${token}" target="_blank">${frontendUrl}/reset-password?token=${token}</a>
      <p>Thank you,<br/>Proof Buddy Team</p>
  `;
};
