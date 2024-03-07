import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import dragon from '../images/drexel-dragon.svg'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import '../scss/_home.scss';

/**
 * The Home component serves as the landing page of the application.
 */
const Home = () => {
  // Accessing the current user's information from the AuthContext.
  const { user } = useAuth();
  const [proofType, setProofType] = useState('/er-racket');

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
                <p>Let's begin working on some proofs!</p>
                <br></br>
                <Form>
                  <Form.Group>
                    <Form.Floating>
                      <FloatingLabel controlId="proofType" label="Type of Proof">
                        <Form.Select
                          aria-label="Floating label proof type select"
                          id='proofType'
                          onChange={e => { setProofType(e.target.value); }}>
                          <option value='/er-racket'>Equational Reasoning: Racket</option>
                          <option value='/NaturalDeductionPropositionalLogic'>Natural Deduction: Propositional Logic</option>
                          <option value='/NaturalDeductionFirstOrderLogic'>Natural Deduction: First Order Logic</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Floating>
                  </Form.Group>

                  <div className='button-wrap'>
                    <Button as={Link} className='orange-btn' to={proofType}>Let's Begin</Button>
                  </div>
                </Form>
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
