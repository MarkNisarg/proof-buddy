import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import MainLayout from '../layouts/MainLayout';
import authService from '../services/authService';
import validateField from '../utils/formValidationUtils';
import { useInputState } from '../hooks/useInputState';
import { usePasswordVisibility } from '../hooks/usePasswordVisibility';
import { useFormValidation } from '../hooks/useFormValidation';
import { useFormSubmit } from '../hooks/useFormSubmit';
import { useServerError } from '../hooks/useServerError';
import '../scss/_forms.scss';
import '../scss/_signup.scss';

/**
 * SignUpUser component facilitates the registration process for new users,
 * supporting roles as student or instructor.
 * It incorporates several custom hooks for form management, including state handling, validation, and submission.
 * Upon successful registration, users are redirected for email verification with a token stored in cookies.
 */
const SignUpUser = ({ role }) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [formValues, handleChange] = useInputState(initialValues);
  const [passwordType, toggleVisibility] = usePasswordVisibility();
  const [serverError, handleServerError] = useServerError();
  const [validationMessages, handleBlur, setAllTouched, isFormValid ] = useFormValidation(formValues, validateField);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSignUpUser = async () => {
    const userData = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      is_instructor: role === 'instructor',
      is_student: role === 'student'
    };

    try {
      const response = await authService.registerUser(userData);
      if (response.emailResendToken) {
        Cookies.set('emailResendToken', response.emailResendToken, { expires: 1/24, secure: true, sameSite: 'Strict' });
        navigate('/verify-email');
      }
    } catch (error) {
      handleServerError(error);
    }
  };

  const { handleSubmit } = useFormSubmit(isFormValid, setValidated, setAllTouched, handleSignUpUser);

  return (
    <MainLayout>
      <Container className='signup-container'>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} lg={4}>
            <h1>Sign up as {role === 'student' ? 'a' : 'an'} {role}</h1>
            {serverError && <Alert variant={'danger'}>{serverError}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className='signup-username'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="signupUsername"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={formValues.username}
                    onBlur={() => handleBlur('username')}
                    onChange={handleChange}
                    isInvalid={!!validationMessages.username}
                    required
                  />
                  <label htmlFor="signupUsername">Username</label>
                  <Form.Control.Feedback type="invalid">
                    {validationMessages.username}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <Form.Group className='signup-email'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="signupEmail"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={formValues.email}
                    onBlur={() => handleBlur('email')}
                    onChange={handleChange}
                    isInvalid={!!validationMessages.email}
                    required
                  />
                  <label htmlFor="signupEmail">Email</label>
                  <Form.Control.Feedback type="invalid">
                    {validationMessages.email}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <Form.Group className='signup-password'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="signupPassword"
                    name="password"
                    type={passwordType}
                    placeholder="Enter password"
                    value={formValues.password}
                    onBlur={() => handleBlur('password')}
                    onChange={handleChange}
                    isInvalid={!!validationMessages.password}
                    required
                  />
                  <label htmlFor="signupPassword">Password</label>
                  <i className={`fa-solid ${passwordType === 'text' ? 'fa-eye' : 'fa-eye-slash'}`} onClick={toggleVisibility}></i>
                  <Form.Control.Feedback type="invalid">
                    {validationMessages.password}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <Form.Group className='signup-confirm-password'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="signupConfirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Enter confirm password"
                    value={formValues.confirmPassword}
                    onBlur={() => handleBlur('confirmPassword')}
                    onChange={handleChange}
                    isInvalid={!!validationMessages.confirmPassword}
                    required
                  />
                  <label htmlFor="signupConfirmPassword">Confirm Password</label>
                  <Form.Control.Feedback type="invalid">
                    {validationMessages.confirmPassword || 'Please confirm your password.'}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit" className='form-submit'>
                  Sign up
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default SignUpUser;
