import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/esm/Button';

const EquationalReasoningRacket = () => {

  return (
    <MainLayout>
      <Container className='create-proof-container'>
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
        <Button>Back</Button>
      </Container>
    </MainLayout>
  );
};

export default EquationalReasoningRacket;