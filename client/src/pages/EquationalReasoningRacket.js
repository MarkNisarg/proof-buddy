import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

const EquationalReasoningRacket = () => {

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleVisibility = () => {
    setIsFormVisible(!isFormVisible);
  }

  return (
    <MainLayout>
      <Container className='equational-reasoning-bracket-container'>
        <Col className='text-center'>
          <h2>Equational Reasoning: Racket</h2>
        </Col>
        <Col className='text-center'>
          <Row>
            <Col className='text-center' md={4}>
              <Button onClick={handleVisibility} >Start New Proof</Button>  
            </Col>
            <Col className='text-center' md={4}>
              <Button>Help</Button>  
            </Col>
            <Col className='text-center' md={4}>
              <Link to='/'>
                <Button>Return To Home</Button>
              </Link>
            </Col>
          </Row>
        </Col>
        {
          isFormVisible && 

        <Form >
          <Form.Group className='proof-creation'>
            <Form.Floating>
              <Col md={4}>
                <FormLabel>
                  <h3>Name</h3>
                </FormLabel>

                <Form.Control
                  id='proofName'
                  type='text'
                  placeholder='Enter Name'
                />
              </Col>

              <Col>
                <FormLabel>
                  <h3>Lemmas Allowed?</h3>
                </FormLabel>
                <Form.Check 
                  id='proofLemmas'
                  type='switch'
                  label="Lemmas Enabled"
                />
              </Col>

              <Row className='text-center'>
                <Col md={3}>
                  <Form.Control
                    id='proofName'
                    type='text'
                    placeholder='Enter Bracket'
                  />
                </Col>
                <Col md={3}>
                  <h2>=</h2>
                </Col>
                <Col md={3}>
                  <Form.Control
                    id='proofName'
                    type='text'
                    placeholder='Enter Bracket'
                  />
                </Col>
              </Row>

            </Form.Floating>
          </Form.Group>
        </Form>  
        }

        <br>
        </br>
        
        <Col>
          <Row>
            <Col>
              <Button id='startButton'>Save Proof</Button>
            </Col>

            <Col>
              <Button id='counterButton'>Start Counter Example</Button>
            </Col>
          </Row>
        </Col>
         
      </Container>
    </MainLayout>
  );
};

export default EquationalReasoningRacket;