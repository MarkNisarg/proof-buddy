import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MainLayout from '../layouts/MainLayout';
import AuthService from '../services/AuthService';

const EmailVerification = () => {
  const [serverMessage, setServerMessage] = useState({ message: '', type: '' });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const email = Cookies.get('email');
    if (!email) {
      navigate('/signup');
      return;
    }

    const handleEmailVerification = async () => {
      const token = searchParams.get('token');
      if (token) {
        try {
          await AuthService.verifyEmail(token);
          Cookies.remove('email');
          navigate('/verify-success');
        } catch (error) {
          setServerMessage({message: error.response.data.message || 'Failed to verify email. Please try the link again or request a new one.', type: 'error'});
        }
      }
    };

    handleEmailVerification();
    window.addEventListener('popstate', handleEmailVerification);

    return () => {
      window.removeEventListener('popstate', handleEmailVerification);
    };
  }, [searchParams, navigate]);

  const handleResendEmail = async () => {
    try {
      const response = await AuthService.resendVerificationEmail();
      setServerMessage({message: response.message, type: 'success'});
    } catch (error) {
      setServerMessage({message: error.response.data.message || 'An error occurred while trying to resend the verification email. Please try again later.', type: 'error'});
    }
  };

  return (
    <MainLayout>
      <Container>
        <div className="email-verification-container">
          <h1>Almost there...</h1>
          <p>Please verify your email, then head over to the login page to access your account.</p>
          <p>Didn't receive your confirmation email? We can try sending it again.</p>
          {serverMessage.message ? (
            <p className={`resend-message ${serverMessage.type}`}>{serverMessage.message}</p>
          ) : (
            <>
              <div className='button-wrap'>
                <Button variant="warning" onClick={handleResendEmail}>Send Email Again</Button>
              </div>
            </>
          )}
        </div>
      </Container>
    </MainLayout>
  );
};

export default EmailVerification;
