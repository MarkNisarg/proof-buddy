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
  
  const [name, setName] = useState('');

  const [racketList, setRacketList] = useState([{ Racket: ''}])

  const handleRacketListChange = (i, e) => {
    let newRacketList = [...racketList];
    newRacketList[i][e.target.name] = e.target.value;
    setRacketList(newRacketList);
  }

  const addNewRacketLine = () => {
    setRacketList([...racketList, {Racket: ''}]);
  }

  const removeRacketLine = (i) => {
    let newRacketList = [...racketList];

    //must list racket names.... Something is wrong with removal. Fix Mark!
    for (i=0; i < newRacketList.length; i++) {
      console.log(newRacketList[i].name);
    }

    racketList.splice(i, 1);
    console.log(newRacketList.length);
    setRacketList(newRacketList);
  }
  
  const handleVisibility = () => {
    setIsFormVisible(!isFormVisible);
  }

  return (
    <MainLayout>
      <Container className='equational-reasoning-racket-container'>
        <Col className='text-center'>
          <h2>Equational Reasoning: Racket</h2>
        </Col>
        <Col className='text-center'>
          <Row>
            <Col className='text-center' md={4}>
              <Button onClick={handleVisibility} >Start/Close New Proof</Button>  
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
          <Form.Group id='ER-proof-creation'>
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
              <br></br>
              <Col>
                <h3>
                  Left Hand Side:
                </h3>
              </Col>
              <br></br>
              {/* Using Map to Create Input fields for rackets */}
              <Row className='text-center'>
                {racketList.map((racket, index) => (
                  <Row key={index}>
                    <Col md={3}>
                      <Form.Control
                        id='leftRacket1'
                        type='text'
                        placeholder='Enter Racket'
                        onChange={e => handleRacketListChange(index, e)}
                        name={racket}
                      />
                    </Col>

                    <Col md={3}>
                      <Form.Control
                        id='leftRacket2'
                        type='text'
                        placeholder='Enter Rule'
                        onChange={e => handleRacketListChange(index, e)}
                        name={'Rule' + ' ' + index}
                      />
                    </Col>
                    
                    <Col md={3}>
                      <h2>=</h2>
                    </Col>

                    {/* <Col md={3}>
                      <Form.Control
                        id='rightRacket'
                        type='text'
                        placeholder='Enter Racket'
                      />
                    </Col> */}
                    {
                      index ?
                        <Col md={2}>
                          <Button  variant='danger' onClick={() => removeRacketLine(index)}>Remove</Button>
                        </Col>
                        : null
                    }
                  </Row>
 
                ))}
                <br></br>
                <Col md={1}>
                  <Button onClick={addNewRacketLine}>Add Line</Button>
                </Col>
                {/* <Col md={2}>
                  <Button variant='danger' onClick={addNewBracketLine}>Remove Line</Button>
                </Col> */}
                
              </Row>

            </Form.Floating>
          </Form.Group>
        </Form>   
        }

      </Container>
    </MainLayout>
  );
};

export default EquationalReasoningRacket;