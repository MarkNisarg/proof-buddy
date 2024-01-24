import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const EquationalReasoningRacket = () => {

  return (
    <MainLayout>
      <Container className='equational-reasoning-bracket-container'>
        <Col className='text-center'>
          <h2>Equational Reasoning: Racket</h2>
        </Col>
        <Form>
          <Form.Group className='proof-creation'>
            <FormLabel>
              <h3>Name</h3>
            </FormLabel>
            <Form.Control
              id='proofName'
              type='text'
              placeholder='Enter Name'
            />
          </Form.Group>

          <Form.Group>
            <FormLabel>
              <h3>Rules</h3>
            </FormLabel>
            <Form.Select 
              id='proofRules'
              type='select'>
              <option>TFL - Basic Rules Only</option>
              <option>TFL - Basic & Derived Rules</option>
              <option>FOL - Basic Rules Only</option>
              <option>FOL - Basic & Derived Rules</option>
              <option>ER - Basic Rules Only</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group>
            <FormLabel>
              <h3>Lemmas Allowed?</h3>
            </FormLabel>
            <Form.Check 
              id='proofLemmas'
              type='switch'
              label="Lemmas Enabled"
            />
          </Form.Group>
        </Form>
        <Button id='startButton'>Start Proof</Button>
        <br></br>
        <br></br>
        <Button id='counterButton'>Start Counter Example</Button>
        <br></br>
        <br></br>
        
        <Col>
          <Link to='/'>
            <Button>Back</Button>
          </Link>
        </Col>
        
      </Container>
    </MainLayout>
  );
};

export default EquationalReasoningRacket;