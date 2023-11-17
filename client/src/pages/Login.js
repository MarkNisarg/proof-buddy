import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle the login submission.
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const credentials = {
        username,
        password
      };

      const response = await AuthService.login(credentials);
      if (response.token) {
        // Store the token received from the server.
        localStorage.setItem('token', response.token);
        console.log('Login successful!');

        // TODO: Redirect to dashboard after successful login.
        navigate('/dashboard');
      }
      // TODO: Handle cases where login is unsuccessful.
    } catch (error) {
      console.error('Login failed:', error);
      // TODO: Implement error handling logic here.
    }
  };

  return (
    <MainLayout>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2 className="text-center">Log In</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
            Login
              </Button>
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
