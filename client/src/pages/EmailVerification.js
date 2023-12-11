import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MainLayout from '../layouts/MainLayout';
import AuthService from '../services/AuthService';
import '../scss/_email-verification.scss';

const EmailVerification = () => {
  const [serverMessage, setServerMessage] = useState({ message: '', type: '' });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const emailResendToken = Cookies.get('emailResendToken');
    if (!emailResendToken) {
      navigate('/');
      return;
    }

    const handleEmailVerification = async () => {
      const token = searchParams.get('token');
      if (token) {
        try {
          const isVerified = await AuthService.verifyEmail(token);
          if (isVerified.success) {
            Cookies.remove('emailResendToken');
            navigate('/verify-success', { state: { verified: true } });
          }
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
      setServerMessage({message: response.message, type: 'text-success'});
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setServerMessage({message: error.response.data.message, type: 'text-danger'});
      } else {
        setServerMessage({message: 'An error occurred while trying to resend the verification email. Unable to connect to the server.', type: 'text-danger'});
      }
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
                <Button className='orange-btn' onClick={handleResendEmail}>Send Email Again</Button>
              </div>
            </>
          )}
        </div>
      </Container>
    </MainLayout>
  );
};

export default EmailVerification;
