import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MainLayout from '../layouts/MainLayout';
import AuthService from '../services/AuthService';

const SignUpUser = ({ role }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUpUser = async (event) => {
    event.preventDefault();

    // Additional validation logic can be added here.
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
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

      const response = await AuthService.registerUser(userData);
      localStorage.setItem('userEmail', email);
      console.log('Sign up successful:', response);

      // Navigate to verify email page upon successful registration.
      navigate('/verify-email');
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <MainLayout>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2 className="text-center">Sign up as an {role}</h2>
            <Form onSubmit={handleSignUpUser}>
              <Form.Group controlId="signupUserUsername">
                <Form.Label>Username*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <Form.Text className="text-muted">
                  Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="signupUserEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="signupUserPassword">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Form.Text className="text-muted">
                  Your password can't be too similar to your other personal information.<br />
                  Your password must contain at least 8 characters.<br />
                  Your password can't be a commonly used password.<br />
                  Your password can't be entirely numeric.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="signupUserConfirmPassword">
                <Form.Label>Password confirmation*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter the same password as before, for verification."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
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
