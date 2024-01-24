import React, {useState} from 'react';
import { useAuth } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import dragon from '../images/drexel-dragon.svg'
import Form from 'react-bootstrap/Form';
import '../scss/_home.scss';
import Button from 'react-bootstrap/esm/Button';

const Home = () => {
  const { user } = useAuth();
  const [proofType, setProofType] = useState('');

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
                <Col>
                  <Form>
                    <Form.Group>
                      <Form.Floating>
                        <Col md={3}>
                          <Form.Label>
                            Type of Proof:
                          </Form.Label>
                        </Col>
                        <Col md={6}>
                          <Form.Select
                            id='proofType'
                            type='select'
                            onChange={this.setProofType.bind(this)}
                          >
                            <option 
                              id='EquationalReasoning' 
                              value='EquationalReasoningRacket'>
                                Equational Reasoning: Racket
                            </option>
                            <option value='NaturalDeductionPropositionalLogic'>Natural Deduction: Propositional Logic</option>
                            <option value='NaturalDeductionFirstOrderLogic'>Natural Deduction: First Order Logic</option>
                          </Form.Select>
                        
                        </Col>
                        
                      </Form.Floating>   
                    </Form.Group>
                  </Form>
                
                </Col>
               
                <Link to="/proof">
                  <Button>
                    Lets Begin
                  </Button>
                </Link>
                
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
