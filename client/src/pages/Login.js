import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
import '../scss/_login.scss';

/**
 * The Login component provides a form for users to login.
 * It integrates custom hooks for input state management, password visibility toggling, form validation,
 * and server error handling. Successful login attempts store the access token and redirect to the homepage.
 * Unsuccessful attempts may navigate to the email verification page or display an error.
 */
const Login = () => {
  const initialValues = {
    username: '',
    password: ''
  }
  const [formValues, handleChange] = useInputState(initialValues);
  const [passwordType, toggleVisibility] = usePasswordVisibility();
  const [serverError, handleServerError] = useServerError();
  const [validationMessages, handleBlur, setAllTouched, isFormValid ] = useFormValidation(formValues, validateField);
  const [validated, setValidated] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const credentials = {
      username: formValues.username,
      password: formValues.password
    };

    try {
      const response = await authService.login(credentials);
      if (response.accessToken) {
        Cookies.set('accessToken', response.accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
        await login();
        navigate('/');
      }
    } catch (error) {
      handleServerError(error);
      if (error.response.data.emailResendToken) {
        Cookies.set('emailResendToken', error.response.data.emailResendToken, { expires: 1/24, secure: true, sameSite: 'Strict' });
        navigate('/verify-email');
      }
    }
  };

  const { handleSubmit } = useFormSubmit(isFormValid, setValidated, setAllTouched, handleLogin);

  return (
    <MainLayout>
      <Container className='login-container'>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} lg={4}>
            <h1>Log In</h1>
            {serverError && <Alert variant={'danger'}>{serverError}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className='login-username'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="loginUsername"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={formValues.username}
                    onBlur={() => handleBlur('username')}
                    onChange={handleChange}
                    isInvalid={!!validationMessages.username}
                    required
                  />
                  <label htmlFor="loginUsername">Username</label>
                  <Form.Control.Feedback type="invalid">
                    {validationMessages.username}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <Form.Floating className="mb-2">
                <Form.Control
                  id="loginPassword"
                  name="password"
                  type={passwordType}
                  placeholder="Enter password"
                  value={formValues.password}
                  onBlur={() => handleBlur('password')}
                  onChange={handleChange}
                  isInvalid={!!validationMessages.password}
                  required
                />
                <label htmlFor="loginPassword">Password</label>
                <i className={`fa-solid ${passwordType === 'text' ? 'fa-eye' : 'fa-eye-slash'}`} onClick={toggleVisibility}></i>
                <Form.Control.Feedback type="invalid">
                  {validationMessages.password}
                </Form.Control.Feedback>
              </Form.Floating>

              <div className="link-wrap">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <div className="text-center">
                <Button variant="primary" type="submit" className='form-submit'>
                  Login
                </Button>
              </div>
              <hr/>
              <div className="link-wrap signup-link">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default Login;
