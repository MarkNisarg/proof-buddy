import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <MainLayout>
      <Container className="text-center">
        <h2>Join Today!</h2>
        <p>Select the type of account to create</p>
        <Button as={Link} variant="primary" to="/signup/student">Student</Button>
        <Button as={Link} variant="warning" to="/signup/instructor">Instructor</Button>
      </Container>
    </MainLayout>
  );
};

export default SignUp;
