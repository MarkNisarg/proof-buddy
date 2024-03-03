import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import MainLayout from '../layouts/MainLayout';
import authService from '../services/AuthService';
import validateField from '../utils/formValidationUtils';
import { useInputState } from '../hooks/useInputState';
import { usePasswordVisibility } from '../hooks/usePasswordVisibility';
import { useFormValidation } from '../hooks/useFormValidation';
import { useFormSubmit } from '../hooks/useFormSubmit';
import { useServerError } from '../hooks/useServerError';
import '../scss/_forms.scss';

/**
 * The ResetPassword component provides a form for users to reset their password.
 * It leverages custom hooks for input state management, password visibility, form validation,
 * form submission, and server error handling. Upon successful password reset, it navigates to a
 * success page and removes relevant cookies.
 */
const ResetPassword = () => {
  const initialValues = {
    password: '',
    confirmPassword: ''
  }
  const [formValues, handleChange] = useInputState(initialValues);
  const [passwordType, toggleVisibility] = usePasswordVisibility();
  const [serverError, handleServerError] = useServerError();
  const [validationMessages, handleBlur, setAllTouched, isFormValid ] = useFormValidation(formValues, validateField);
  const [validated, setValidated] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (!resetToken) {
      navigate('/');
      return;
    }

    setResetToken(resetToken);
  }, [navigate, searchParams]);

  const handleResetPassword = async () => {
    const password = formValues.password;

    try {
      await authService.resetPassword(resetToken, password);
      Cookies.remove('emailResendToken');
      navigate('/reset-password/success', { state: { verified: true } });
    } catch (error) {
      handleServerError(error);
    }
  };

  const { handleSubmit } = useFormSubmit(isFormValid, setValidated, setAllTouched, handleResetPassword);

  return (
    <MainLayout>
      <Container className='reset-password-container'>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} lg={4}>
            <h1>Reset Password</h1>
            {serverError && <Alert variant={'danger'}>{serverError}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className='reset-password-field'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="resetPassword"
                    name="password"
                    type={passwordType}
                    placeholder="Enter new password"
                    value={formValues.password}
                    onBlur={() => handleBlur('password')}
                    onChange={handleChange}
                    isInvalid={!!validationMessages.password}
                    required
                  />
                  <label htmlFor="resetPassword">New Password</label>
                  <i className={`fa-solid ${passwordType === 'text' ? 'fa-eye' : 'fa-eye-slash'}`} onClick={toggleVisibility}></i>
                  <Form.Control.Feedback type="invalid">
                    {validationMessages.password}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <Form.Group className='reset-confirm-password-field'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="resetConfirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={formValues.confirmPassword}
                    onBlur={() => handleBlur('confirmPassword')}
                    onChange={handleChange}
                    isInvalid={!!validationMessages.confirmPassword}
                    required
                  />
                  <label htmlFor="resetConfirmPassword">Confirm New Password</label>
                  <Form.Control.Feedback type="invalid">
                    {validationMessages.confirmPassword || 'Please confirm your password.'}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit" className='form-submit'>
                  Reset Password
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default ResetPassword;
