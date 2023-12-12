import React, { useState, useEffect } from 'react';
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
import AuthService from '../services/AuthService';
import '../scss/_forms.scss';
import '../scss/_login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    password: false
  });
  const [validationMessages, setValidationMessages] = useState({
    username: '',
    password: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setValidationMessages({
      username: touched.username && !username ? 'Please provide a username.' : '',
      password: touched.password && !password ? 'Please provide a password.' : ''
    });
  }, [username, password, touched]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle the login submission.
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setTouched({
      username: true,
      password: true
    });

    if (!form.checkValidity() || Object.values(validationMessages).some(msg => msg)) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const credentials = {
        username,
        password
      };

      const response = await AuthService.login(credentials);
      if (response.accessToken) {
        Cookies.set('accessToken', response.accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
        await login();
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setServerError(error.response.data.message);
        if (error.response.data.emailResendToken) {
          Cookies.set('emailResendToken', error.response.data.emailResendToken, { expires: 1/24, secure: true, sameSite: 'Strict' });
          navigate('/verify-email');
        }
      } else {
        console.log(error);
        setServerError('An error occurred during login. Unable to connect to the server.');
      }
    }
  };

  return (
    <MainLayout>
      <Container className='login-container'>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} lg={4}>
            <h1>Log In</h1>
            {serverError && <Alert variant={'danger'}>{serverError}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleLogin}>
              <Form.Group className='login-username'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="loginUsername"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onBlur={() => handleBlur('username')}
                    onChange={(e) => setUsername(e.target.value)}
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onBlur={() => handleBlur('password')}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!validationMessages.password}
                  required
                />
                <label htmlFor="loginPassword">Password</label>
                <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} onClick={toggleShowPassword}></i>
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
