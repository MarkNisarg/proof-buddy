import React, { useState, useRef } from 'react';
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

  const [isLeftHandActive, setIsLeftHandActive] = useState(true);
  
  const [leftHandSideProofLineList, setLeftHandSideProofLineList] = useState([{proofLineRacket: '', proofLineRule: ''}]);
  
  const[rightHandSideProofLineList, setRightHandSideProofLineList] = useState([{proofLineRacket: '', proofLineRule: ''}]);

  const handleToggleLAndR = () => {
    setIsLeftHandActive(!isLeftHandActive); 
  }

  const handleProofLineListChange = (index, element, targetList) => {
    let newProofLineList = [...targetList];

    if (element.target.id == 'left-racket'){
      newProofLineList[index].proofLineRacket = element.target.value;
      console.log('Racket: ' + newProofLineList[index].proofLineRacket);
    } else if(element.target.id == 'left-rule') {
      newProofLineList[index].proofLineRule = element.target.value;
      console.log('Rule: ' + newProofLineList[index].proofLineRule);
    } else {
      throw new Error('Error in creating racket and rules from input field.');
    }
  }

  const addNewProofLineRightHandSide = () => {
    setRightHandSideProofLineList([...rightHandSideProofLineList, {proofLineRacket: '', proofLineRule: ''}]);
    console.log('RHS length: ' + rightHandSideProofLineList.length);
  }

  const addNewProofLineLeftHandSide = () => {
    setLeftHandSideProofLineList([...leftHandSideProofLineList, {proofLineRacket: '', proofLineRule: ''}]);
    console.log('LHS length: ' + leftHandSideProofLineList.length);
  }

  const removeProofLineLHS = (index) => {
    let newLeftHandSideList = [...leftHandSideProofLineList];
   
    newLeftHandSideList.splice(index, 1);
    setLeftHandSideProofLineList(newLeftHandSideList);
  }

  const removeProofLineRHS = (index) => {
    let newRightHandSideList = [...rightHandSideProofLineList];
   
    newRightHandSideList.splice(index, 1);
    setRightHandSideProofLineList(newRightHandSideList);
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
          <Form.Group id='er-proof-creation'>
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
              
              <Col className='text-center'>
                <FormLabel>
                  <h4>Toggle LHS/RHS</h4>
                </FormLabel>
                <Form.Check
                  md={2}
                  id='lhs-rhs-toggle'
                  type='switch'
                  onChange={handleToggleLAndR}
                  
                />
              </Col>
              <br></br>

              <Col className='text-center'>
                { isLeftHandActive &&
                  <h3>Left Hand Side:</h3>
                }

                { !isLeftHandActive &&
                  <h3>Right Hand Side:</h3>
                }
                
              </Col>
              <br></br>
              
              {/* Using Map to Create Input fields for rackets */}
              <Row className='text-center'>
                { !isLeftHandActive && rightHandSideProofLineList.map((racket, index) => (
                  <Row key={index}>

                    {/* if LHS is inactive, then render '=' sign on left of equation */}
                    { !isLeftHandActive &&
                      <Col md={1}>
                        <h3>=</h3>
                      </Col>
                    }

                    <Col md={6}>
                      {/* if LHS is inactive, then render RHS Form.Control */}
                      { !isLeftHandActive &&
                        <Form.Control
                          id='right-racket'
                          type='text'
                          placeholder='Enter Racket for RHS'
                          onChange={element => handleProofLineListChange(index, element, rightHandSideProofLineList)}
                        />
                      }
                    </Col>

                    <Col md={3}>
                      {/* if LHS is inactive, then render RHS Form.Control */}
                      { !isLeftHandActive &&
                        <Form.Control
                          id='right-rule'
                          type='text'
                          placeholder='Enter Rule for RHS'
                          onChange={element => handleProofLineListChange(index, element, rightHandSideProofLineList)}
                        />
                      } 
                    </Col>
                    
                    {/* This method simply removes a RHS line from the rightHandSideProofLineList by targeting its index in the array */}
                    <Col md={1}>
                      {                   
                        index ?
                          <Col md={1}>
                            { !isLeftHandActive &&
                              <Button  variant='danger' onClick={() => 
                                removeProofLineRHS(index)}>Remove</Button>
                            }
                          </Col>
                          : null
                      }
                    </Col>
                  </Row>
                ))}

                { isLeftHandActive && leftHandSideProofLineList.map((racket, index) => (
                  <Row key={index}>

                    {/* if LHS is active, then render LHS Form.Control */}
                    <Col md={6}>
                      { isLeftHandActive &&
                        <Form.Control
                          id='left-racket'
                          type='text'
                          placeholder='Enter Racket for LHS'
                          onChange={element => handleProofLineListChange(index, element, leftHandSideProofLineList)}
                        />
                      }
                    </Col> 
                    
                    {/* if LHS is active, then render LHS Form.Control */}
                    <Col md={3}>
                      { isLeftHandActive &&
                        <Form.Control
                          id='left-rule'
                          type='text'
                          placeholder='Enter Rule for LHS'
                          onChange={element => handleProofLineListChange(index, element, leftHandSideProofLineList)}
                        />
                      }
                    </Col>
                      
                    {/* This method simply removes a LHS line from the leftHandSideProofLineList by targeting its index in the array */}
                    <Col md={1}>
                      {                   
                        index ?
                          <Col md={1}>
                            { isLeftHandActive &&
                              <Button  variant='danger' onClick={() => 
                                removeProofLineLHS(index)}>Remove</Button>
                            }
                          </Col>
                          : null
                      }
                    </Col>
                    
                    { isLeftHandActive &&
                      <Col md={1}>
                        <h3>=</h3>
                      </Col>
                    }
                    
                  </Row>
 
                ))}

                <br></br>
                <Col md={1}>
                  { isLeftHandActive &&
                    <Button onClick={addNewProofLineLeftHandSide}>Add Line</Button>
                  }

                  {
                    !isLeftHandActive &&
                    <Button onClick={addNewProofLineRightHandSide}>Add Line</Button>
                  }
                  
                </Col>
               
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