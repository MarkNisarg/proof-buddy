import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import MainLayout from '../layouts/MainLayout';
import AuthService from '../services/AuthService';
import '../scss/_forms.scss';
import '../scss/_forgot-password.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState('');
  const [validated, setValidated] = useState(false);
  const [touched, setTouched] = useState({ email: false });
  const [validationMessages, setValidationMessages] = useState({ email: '' });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Please provide a valid email address.';
  };

  const handleBlur = (field) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  useEffect(() => {
    setValidationMessages((prevMessages) => ({
      email: touched.email ? validateEmail(email) : '',
      ...prevMessages
    }));
  }, [email, touched.email]);

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);

    setTouched({ email: true });

    if (!form.checkValidity() || Object.values(validationMessages).some(msg => msg)) {
      event.stopPropagation();
      return;
    }

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
              <Form.Group className='fp-email'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="fpEmail"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onBlur={() => handleBlur('email')}
                    onChange={(e) => setEmail(e.target.value)}
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
