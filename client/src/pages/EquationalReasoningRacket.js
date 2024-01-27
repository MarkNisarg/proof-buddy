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

  const [isLeftHandVisible, setIsLeftHandVisible] = useState(true);
  //console.log(isLeftHandVisible);
  
  const [leftHandSideProofLineList, setLeftHandSideProofLineList] = useState([{ proofLine: ''}]);
  
  const[rightHandSideProofLineList, setRightHandSideProofLineList] = useState([{proofLine: ''}]);

  const [activeProofLineList, setActiveProofLineList] = useState([[{ proofLine: ''}]]);

  const handleToggleLAndR = () => {
    setIsLeftHandVisible(!isLeftHandVisible);
    
  }

  const handleProofLineListChange = (i, e) => {
    //let newProofLineList = [...proofLineList];
    //wrong code fix
    //newRacketList[i][e.target.name] = e.target.value;
    //setProofLineList(newProofLineList);
  }

  const addNewProofLine = () => {
    setActiveProofLineList([...activeProofLineList, {proofLine: ''}]);
    //setProofLineList([...proofLineList, {proofLine: ''}]);
  }

  const removeProofLine = (index) => {
    let newProofLineList = [...activeProofLineList];
   
    newProofLineList.splice(index, 1);
    setActiveProofLineList(newProofLineList);
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
                {activeProofLineList.map((racket, index) => (
                  
                  <Row key={index}>
                    
                    <Col md={6}>
                      { isLeftHandVisible &&
                        <Form.Control
                          id='left-racket'
                          type='text'
                          placeholder='Enter Racket'
                          onChange={e => handleProofLineListChange(index, e)}
                        />
                      }
                    </Col>

                    <Col md={3}>
                      { isLeftHandVisible &&
                        <Form.Control
                          id='left-rule'
                          type='text'
                          placeholder='Enter Rule'
                          onChange={e => handleProofLineListChange(index, e)}
                        />
                      }
                    </Col>

                    <Col md={1}>
                      {                   
                        index ?
                          <Col md={1}>
                            { isLeftHandVisible &&
                              <Button  variant='danger' onClick={() => 
                                removeProofLine(index)}>Remove</Button>
                            }
                          </Col>
                          : null
                      }
                    </Col>

                    <Col md={1}>
                      <h3>=</h3>
                    </Col>

                    {/* <Col md={3}>
                      <Form.Control
                        id='rightRacket'
                        type='text'
                        placeholder='Enter Racket'
                      />
                    </Col> */}
                  </Row>
 
                ))}
                <br></br>
                <Col md={1}>
                  <Button onClick={addNewProofLine}>Add Line</Button>
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