import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import verificationService from '../services/verificationService';

/**
 * Custom hook for handling email verification logic.
 * @param {Function} setServerMessage - Function to set messages from the server response or errors.
 *
 * @example
 * const [serverMessage, setServerMessage] = useState();
 * useEmailVerification(setServerMessage);
 */
const useEmailVerification = (setServerMessage) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailVerification = async () => {
      const token = searchParams.get('token');
      if (token) {
        try {
          const isVerified = await verificationService.verifyEmail(token);
          if (isVerified.success) {
            Cookies.remove('emailResendToken');
            navigate('/verify-success', { state: { verified: true } });
          }
        } catch (error) {
          setServerMessage({
            message: error.response?.data?.message || 'Failed to verify email. Please try the link again or request a new one.',
            type: 'text-danger error'
          });
        }
      }
    };

    handleEmailVerification();
    window.addEventListener('popstate', handleEmailVerification);

    return () => {
      window.removeEventListener('popstate', handleEmailVerification);
    };
  }, [searchParams, navigate, setServerMessage]);
};

export { useEmailVerification };
