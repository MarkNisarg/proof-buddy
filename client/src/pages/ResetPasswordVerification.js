import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MainLayout from '../layouts/MainLayout';
import { useCheckEmailResendToken } from '../hooks/useCheckEmailResendToken';
import { useResendVerificationEmail } from '../hooks/useResendVerificationEmail';
import '../scss/_email-verification.scss';

/**
 * ResetPasswordVerification component displays a page instructing the user to check their email
 * for password reset instructions. It leverages custom hooks to check for the presence of a resend token
 * and to handle resending the verification email if the user did not receive it.
 */
const ResetPasswordVerification = () => {
  const [serverMessage, setServerMessage] = useState({ message: '', type: '' });
  const verificationType = 'forgotPassword';
  useCheckEmailResendToken();

  const handleResendEmail = useResendVerificationEmail(verificationType, setServerMessage);

  return (
    <MainLayout>
      <Container>
        <div className="email-verification-container">
          <h1>Check your email...</h1>
          <p>Please check your email for the instructions to reset your password.</p>
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

export default ResetPasswordVerification;
