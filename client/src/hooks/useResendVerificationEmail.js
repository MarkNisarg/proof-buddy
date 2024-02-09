import verificationService from '../services/verificationService';

/**
 * Custom hook for resending verification emails.
 * It abstracts the logic for triggering a resend of the verification email
 * based on the provided verification type.
 *
 * @param {string} verificationType - The type of verification for which the email should be resent.
 * @param {Function} setServerMessage - A state setter function from the consuming component
 *                                      used to display messages from the server response or error handling.
 * @returns {Function} A function that when called, executes the resend verification email logic.
 *
 * @example
 * const [serverMessage, setServerMessage] = useState({});
 * const resendVerificationEmail = useResendVerificationEmail('email', setServerMessage);
 * <button onClick={resendVerificationEmail}>Resend Email</button>
 */
const useResendVerificationEmail = (verificationType, setServerMessage) => {
  const handleResendVerificationEmail = async () => {
    try {
      const response = await verificationService.resendVerificationEmail(verificationType);
      setServerMessage({ message: response.message, type: 'text-success' });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setServerMessage({ message: error.response.data.message, type: 'text-danger' });
      } else {
        setServerMessage({ message: 'An unexpected error occurred.', type: 'text-danger' });
      }
    }
  };

  return handleResendVerificationEmail;
};

export { useResendVerificationEmail };
