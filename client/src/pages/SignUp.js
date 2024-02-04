import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import '../scss/_signup.scss';

/**
 * SignUp component provides aa interface for new users to choose between creating
 * a Student or Instructor account.
 */
const SignUp = () => {
  return (
    <MainLayout>
      <Container className="text-center signup-parent-container">
        <h1>Join Today!</h1>
        <p>Select the type of account to create</p>
        <div className='buttons-wrap'>
          <Button as={Link} className='orange-btn' to="/signup/student">Student</Button>
          <Button as={Link} className='blue-btn' to="/signup/instructor">Instructor</Button>
        </div>
      </Container>
    </MainLayout>
  );
};

export default SignUp;
