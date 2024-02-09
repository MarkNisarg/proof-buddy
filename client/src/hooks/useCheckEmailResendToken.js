import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

/**
 * A Custom hook that checks for an 'emailResendToken'.
 * Use this hook in components that should only be accessible after a email verification.
 *
 * @example
 * useCheckEmailResendToken();
 */
const useCheckEmailResendToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const emailResendToken = Cookies.get('emailResendToken');
    if (!emailResendToken) {
      navigate('/');
      return;
    }
  }, [navigate]);
};

export { useCheckEmailResendToken };
