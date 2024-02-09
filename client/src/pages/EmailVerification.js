import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MainLayout from '../layouts/MainLayout';
import { useCheckEmailResendToken } from '../hooks/useCheckEmailResendToken';
import { useEmailVerification } from '../hooks/useEmailVerification';
import { useResendVerificationEmail } from '../hooks/useResendVerificationEmail';
import '../scss/_email-verification.scss';

/**
 * The EmailVerification component renders a user interface for email verification.
 * It guides the user through the process of verifying their email address.
 */
const EmailVerification = () => {
  const [serverMessage, setServerMessage] = useState({ message: '', type: '' });
  const verificationType = 'signupVerify';
  useCheckEmailResendToken();

  useEmailVerification(setServerMessage);

  const handleResendEmail = useResendVerificationEmail(verificationType, setServerMessage);

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
