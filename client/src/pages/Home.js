import React from 'react';
import { useAuth } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import dragon from '../images/drexel-dragon.svg'
import '../scss/_home.scss';

/**
 * The Home component serves as the landing page of the application.
 */
const Home = () => {
  // Accessing the current user's information from the AuthContext.
  const { user } = useAuth();

  return (
    <MainLayout>
      <Container className='home-container'>
        <Row>
          <Col md={6} className="dragon-section">
            <Image src={dragon} alt='Drexel dragon' fluid />
          </Col>
          <Col md={6} className="text-section">
            <h1>Proof Buddy</h1>
            {user ? (
              <>
                <p>Welcome, {user.username} to your {user.is_student === true ? 'student' : 'instructor'} account!</p>
                <p>Let's begin working on some <Link to="#">proofs</Link>!</p>
              </>
            ) : (
              <>
                <p>Welcome to the platform for verifying mathematical proofs using Truth-Functional Logic (TFL) and First Order Logic (FOL).</p>
                <p><Link to='/login'>Log in</Link> to begin working on some proofs!</p>
                <p>Don't have an account? <Link to="/signup">Sign up</Link> now!</p>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default Home;
