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
import AuthService from '../services/AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  // Function to handle the login submission.
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      try {
        const credentials = {
          username,
          password
        };

        const response = await AuthService.login(credentials);
        console.log(response)
        if (response.accessToken) {
          // Store the token received from the server.
          Cookies.set('accessToken', response.accessToken, { expires: 1/24, secure: true });

          // TODO: Redirect to dashboard after successful login.
          navigate('/dashboard');
        }
        // TODO: Handle cases where login is unsuccessful.
      } catch (error) {
        setServerError(error.response.data.message || 'An error occurred during login.');
      }
    } else {
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <MainLayout>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={9} lg={5}>
            <h2 className="text-center">Log In</h2>
            {serverError && <Alert variant={'danger'}>{serverError}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleLogin}>
              <Form.Group className='login-username'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="loginUsername"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="loginUsername">Username</label>
                  <Form.Control.Feedback type="invalid">
                    Please provide a username.
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <Form.Floating className="mb-3">
                <Form.Control
                  id="loginPassword"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="loginPassword">Password</label>
                <Form.Control.Feedback type="invalid">
                    Please provide a password.
                </Form.Control.Feedback>
              </Form.Floating>

              <Button variant="primary" type="submit">Login</Button>
              <div className="mt-3">
                <Link as={Link} to="/forgot-password">Forgot Password?</Link>
              </div>
              <div>
                Need an account? <Link as={Link} to="/signup">Sign Up</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default Login;
