import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MainLayout from '../layouts/MainLayout';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = Cookies.get('email');
    if (!email) {
      navigate('/signup');
    }
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <MainLayout>
      <Container>
        <div className="email-verification-container">
          <h1>Email Verified!</h1>
          <p>You can close this page.</p>
          <p>Please proceed to login and access your account.</p>
          <p>Or click the button below to go the homepage.</p>
          <div className='button-wrap'>
            <Button variant="primary" onClick={handleGoHome}>Go to Homepage</Button>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default EmailVerificationSuccess;
