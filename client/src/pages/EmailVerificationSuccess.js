import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MainLayout from '../layouts/MainLayout';
import '../scss/_email-verification.scss';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.verified) {
      navigate('/');
    }
  }, [location.state?.verified, navigate]);

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
            <Button className='orange-btn' onClick={handleGoHome}>Go to Homepage</Button>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default EmailVerificationSuccess;
