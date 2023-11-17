import React from 'react';
import Container from 'react-bootstrap/Container';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <MainLayout>
      <Container className="text-center">
        <h1>Proof Buddy</h1>
        <p>Welcome</p>
        <p><Link as={Link} to='/login'>Log in</Link> to begin working on some proofs!</p>
        <p>Don't have an account? <Link  as={Link} to="/signup">Sign up now!</Link></p>
      </Container>
    </MainLayout>
  );
};

export default Home;
