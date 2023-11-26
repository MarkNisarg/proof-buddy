import React, { useState, useEffect, useCallback  } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import MainLayout from '../layouts/MainLayout';
import AuthService from '../services/AuthService';

const SignUpUser = ({ role }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [validated, setValidated] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const [validationMessages, setValidationMessages] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Please provide a valid email address.';
  };

  const validatePassword = (password) => {
    let errorMessage = '';
    if (password.length === 0) {
      errorMessage = 'Please provide a valid password.';
    } else if (password.length < 8) {
      errorMessage = 'Password must be at least 8 characters long.';
    } else if (!/\d/.test(password)) {
      errorMessage = 'Password must include a number.';
    } else if (!/[!@#$%^&*]/.test(password)) {
      errorMessage = 'Password must include a special character (!@#$%^&*).';
    }

    return errorMessage;
  };

  const validateConfirmPassword = useCallback((confirmPassword) => {
    let errorMessage = '';
    if (confirmPassword.length === 0) {
      errorMessage = 'Please provide a confirm password.';
    } else if (confirmPassword !== password) {
      errorMessage = 'Passwords do not match.';
    }

    return errorMessage;
  }, [password]);

  useEffect(() => {
    setValidationMessages({
      username: touched.username && !username ? 'Please provide a username.' : '',
      email: touched.email ? validateEmail(email) : '',
      password: touched.password ? validatePassword(password) : '',
      confirmPassword: touched.confirmPassword ? validateConfirmPassword(confirmPassword) : ''
    });
  }, [username, email, password, confirmPassword, touched, validateConfirmPassword]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSignUpUser = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);

    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    if (!form.checkValidity() || Object.values(validationMessages).some(msg => msg)) {
      event.stopPropagation();
      return;
    }

    try {
      const userData = {
        username,
        email,
        password,
        is_instructor: role === 'instructor',
        is_student: role === 'student'
      };

      await AuthService.registerUser(userData);
      Cookies.set('email', email, { expires: 1/12, secure: true });

      navigate('/verify-email');
    } catch (error) {
      setServerError(error.response.data.message || 'An error occurred during sign up.');
    }
  };

  return (
    <MainLayout>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={9} lg={5}>
            <h2 className="text-center">Sign up as an {role}</h2>
            {serverError && <Alert variant={'danger'}>{serverError}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleSignUpUser}>
              <Form.Group className='signup-username'>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="signupUsername"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onBlur={() => handleBlur('username')}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={!!validationMessages.username}
                    required
                  />
                  <label htmlFor="signupUsername">Username</label>
                  <Form.Control.Feedback type="invalid">
                    {validationMessages.username}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Text className="text-muted mb-2" as={'div'}>
                  Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
                </Form.Text>
              </Form.Group>

              <Form.Group className='signup-email'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="signupEmail"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onBlur={() => handleBlur('email')}
                    onChange={(e) => setEmail(e.target.value)}
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
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="signupPassword"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onBlur={() => handleBlur('password')}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!validationMessages.password}
                    required
                  />
                  <label htmlFor="signupPassword">Password</label>
                  <Form.Control.Feedback type="invalid">
                    {validationMessages.password}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Text className="text-muted mb-2" as={'div'}>
                  Your password can't be too similar to your other personal information.<br />
                  Your password must contain at least 8 characters.<br />
                  Your password can't be a commonly used password.<br />
                  Your password can't be entirely numeric.
                </Form.Text>
              </Form.Group>

              <Form.Group className='signup-confirm-password'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="signupConfirmPassword"
                    type="password"
                    placeholder="Enter confirm password"
                    value={confirmPassword}
                    onBlur={() => handleBlur('confirmPassword')}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Button variant="primary" type="submit">
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
