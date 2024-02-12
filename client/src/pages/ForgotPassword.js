import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useFormValidation } from '../hooks/useFormValidation';
import { useFormSubmit } from '../hooks/useFormSubmit';
import { useServerError } from '../hooks/useServerError';
import '../scss/_forms.scss';
import '../scss/_forgot-password.scss';

/**
 * The ForgotPassword component provides a form for users to request a password reset email.
 * It utilizes custom hooks for managing form state, input changes, validation,
 * form submission, and server error handling.
 */
const ForgotPassword = () => {
  const initialValues = { email: '' }
  const [formValues, handleChange] = useInputState(initialValues);
  const [serverError, handleServerError] = useServerError();
  const [validationMessages, handleBlur, setAllTouched, isFormValid ] = useFormValidation(formValues, validateField);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    const email = formValues.email;

    try {
      const response = await authService.forgotPassword(email);
      if (response.emailResendToken) {
        Cookies.set('emailResendToken', response.emailResendToken, { expires: 1/24, secure: true, sameSite: 'Strict' });
        navigate('/reset-password/verify');
      }
    } catch (error) {
      handleServerError(error);
    }
  };

  const { handleSubmit } = useFormSubmit(isFormValid, setValidated, setAllTouched, handleForgotPassword);

  return (
    <MainLayout>
      <Container className='forgot-password-container'>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} lg={4}>
            <h1>Forgot password?</h1>
            <p>No worries, we'll send you reset instructions.</p>
            {serverError && <Alert variant="danger">{serverError}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className='fp-email'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="fpEmail"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={formValues.email}
                    onBlur={() => handleBlur('email')}
                    onChange={handleChange}
                    isInvalid={!!validationMessages.email}
                    required
                  />
                  <label htmlFor="fpEmail">Email</label>
                  <Form.Control.Feedback type="invalid">
                    {validationMessages.email}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit" className="form-submit">
                  Reset password
                </Button>
              </div>
            </Form>

            <p className='go-login'>
              <Link to="/login"><span>&#8592;</span> Back to log in</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default ForgotPassword;
