import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import MainLayout from '../layouts/MainLayout';
import AuthService from '../services/AuthService';
import '../scss/_forms.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      try {
        await AuthService.forgotPassword(email);
        navigate('/verify-email');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setServerError(error.response.data.message);
        } else {
          setServerError('An error occurred. Please try again later.');
        }
      }
    }
    setValidated(true);
  };

  return (
    <MainLayout>
      <Container className='forgot-password-container'>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} lg={4}>
            <h1>Forgot password?</h1>
            <p>No worries, we'll send you reset instructions.</p>
            {serverError && <Alert variant="danger">{serverError}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleForgotPassword}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Reset password
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default ForgotPassword;
