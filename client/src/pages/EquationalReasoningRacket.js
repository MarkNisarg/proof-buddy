import React, { useState} from 'react';
import MainLayout from '../layouts/MainLayout';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import '../scss/_equational-reasoning.scss'

const EquationalReasoningRacket = () => {

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [isLeftHandActive, setIsLeftHandActive] = useState(true);

  const [isLemmasAllowed, setIsLemmasAllowed] = useState(false);
  
  const [proofName, setProofName] = useState('');

  const [LHSGoal, setLHSGoal] = useState('');

  const [RHSGoal, setRHSGoal] = useState(''); 

  const [currentLHS, setCurrentLHS] = useState('');

  const [currentRHS, setCurrentRHS] = useState('');
  
  const [leftHandSideProofLineList, setLeftHandSideProofLineList] = useState([{proofLineRacket: '', proofLineRule: ''}]);
  
  const[rightHandSideProofLineList, setRightHandSideProofLineList] = useState([{proofLineRacket: '', proofLineRule: ''}]);

  const handleToggleLAndR = () => {
    setIsLeftHandActive(!isLeftHandActive); 
  }

  const handleToggleIsLemmasAllowed = () => {
    setIsLemmasAllowed(!isLemmasAllowed);
  }

  const handleProofLineListChange = (index, element, targetList) => {
    let newProofLineList = [...targetList];

    if (element.target.id == 'left-racket' || element.target.id == 'right-racket'){
      newProofLineList[index].proofLineRacket = element.target.value;
      console.log('Racket: ' + newProofLineList[index].proofLineRacket);
    } else if(element.target.id == 'left-rule' || element.target.id == 'right-rule') {
      newProofLineList[index].proofLineRule = element.target.value;
      console.log('Rule: ' + newProofLineList[index].proofLineRule);
    } else {
      throw new Error('Error in creating racket and rules from input field.');
    }
  }

  const convertToJSON = (target) => {
    return 1;
  }

  const handleFormSubmission = () => {
    console.log(leftHandSideProofLineList.length);
    let EquationalReasoningObject = {
      name: proofName, //String Name
      leftRacketsAndRules: leftHandSideProofLineList, //Array of JavaScript Objects {proofline: '', proofRule: ''}
      rightRacketsAndRules: rightHandSideProofLineList //Array of JavaScript Objects {proofline: '', proofRule: ''}
    }
  }

  const addNewProofLineRightHandSide = () => {
    setRightHandSideProofLineList([...rightHandSideProofLineList, {proofLineRacket: '', proofLineRule: ''}]);
    setCurrentRHS(rightHandSideProofLineList[rightHandSideProofLineList.length - 1].proofLineRacket);
  }

  const addNewProofLineLeftHandSide = () => {
    setLeftHandSideProofLineList([...leftHandSideProofLineList, {proofLineRacket: '', proofLineRule: ''}]);
    setCurrentLHS(leftHandSideProofLineList[leftHandSideProofLineList.length -1].proofLineRacket);
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
      <Container fluid style={{paddingLeft: 10}} className='equational-reasoning-racket-container'>
        <Col className='text-center'>
          <h2>Equational Reasoning: Racket</h2>
        </Col>
        <Col className='text-center'>
          <Row>
            <Col className='text-center' md={4}>
              <Button onClick={handleVisibility} >Start/Close New Proof</Button>  
            </Col>
            <Col className='text-center' md={4}>
              <Button>View Rule Set</Button>  
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

        <Form className='special-form'>
          <Form.Group id='er-proof-creation'>
            <Form.Floating>
              <br></br>
              <Row>
                <Col md={1}>
                  <FormLabel>
                    <h3>Name:</h3>
                  </FormLabel>
                </Col>
                <Col md={4}>
                  <Form.Control
                    id='proofName'
                    type='text'
                    placeholder='Enter Name'
                    onChange={element => setProofName(element.target.value)}
                  />
                </Col>
              </Row>
              
              <Col>
                <h3>Goal:</h3>
              </Col>
              
              <Row className='text-center'>
                <Col>
                  <Form.Control
                    id='lhs-goal'
                    type='text'
                    placeholder='LHS Goal'
                    onChange={(element) => setLHSGoal(element.target.value)}
                  />
                </Col>
                <Col md={1} className='small-col'>
                  <h4>=</h4>
                </Col>
                <Col>
                  <Form.Control
                    id='rhs-goal'
                    type='text'
                    placeholder='RHS Goal'
                    onChange={(element) => setRHSGoal(element.target.value)}
                  />
                </Col>
              </Row>
              <br></br>
              
              <Row>
                <Col>
                  <FormLabel>
                    <h5>Current LHS:</h5>
                  </FormLabel>
                  <Form.Control
                    id='current-lhs'
                    type='text'
                    placeholder=''
                    value={currentLHS}
                    readOnly
                  />
                </Col>
                <Col className='small-col' md={1}>
                </Col>
                <Col>
                  <FormLabel>
                    <h5>Current RHS:</h5>
                  </FormLabel>
                  <Form.Control
                    id='current-rhs'
                    type='text'
                    placeholder=''
                    value={currentRHS}
                    readOnly
                  />
                </Col>
              </Row>

              <br></br>
              <br></br>

              <Col className='text-center'>
                { isLeftHandActive &&
                  <Col id='lhs-rhs-toggle'>
                    Currently Showing
                    <Button id='lhs-rhs-toggle-button' onClick={handleToggleLAndR}>Left Hand Side</Button>
                  </Col>  
                }

                { !isLeftHandActive &&
                  <Col id='lhs-rhs-toggle'>
                    Currently Showing
                    <Button id='lhs-rhs-toggle-button' onClick={handleToggleLAndR}>Right Hand Side</Button>
                  </Col> 
                }
                
              </Col>
              <br></br>
              {/* Using Map to Create Input fields for rackets */}
              <Row className='text-center'>
                { !isLeftHandActive && rightHandSideProofLineList.map((racket, index) => (
                  <Row key={index}>
                    {
                      index == 0 &&
                      <Col className='small-col' md={1}>
                      </Col>
                    }
                    {
                      index > 0 &&
                      <Col className='small-col' md={1}>
                        <h3>=</h3>
                      </Col>
                    }
                    <Col md={6}>
                      {/* if LHS is inactive, then render RHS Form.Control */}
                      { index == 0 &&
                        <Form.Control
                          id='right-racket'
                          type='text'
                          placeholder=''
                          value={RHSGoal}
                          readOnly
                        />
                      }
                      {
                        index > 0 &&
                          <Form.Control
                            id='right-racket'
                            type='text'
                            placeholder='Enter RHS Racket'
                            onChange={element => handleProofLineListChange(index, element, rightHandSideProofLineList)}
                          />
                      }

                    </Col>
                    <Col md={5}>
                      {/* if LHS is inactive, then render RHS Form.Control */}
                      {
                        index == 0 &&
                        <Form.Control
                          id='right-rule'
                          type='text'
                          placeholder=''
                          readOnly
                        />
                      }
                      { index > 0 &&
                        <Form.Control
                          id='right-rule'
                          type='text'
                          placeholder='Enter Rule for RHS'
                          onChange={element => handleProofLineListChange(index, element, rightHandSideProofLineList)}
                        />
                      } 
                    </Col>
                    {/* This method simply removes a RHS line from the rightHandSideProofLineList by targeting its index in the array */}
                    <Col className='small-col' md={1}>
                      {                   
                        index ?
                          <Col md={1}>
                            { !isLeftHandActive &&
                              <Button  variant='danger' onClick={() => 
                                removeProofLineRHS(index)}>x</Button>
                            }
                          </Col>
                          : null
                      }
                    </Col>
                  </Row>
                ))}

                { isLeftHandActive && leftHandSideProofLineList.map((racket, index) => (
                  <Row key={index}>
                    {
                      index == 0 &&
                      <Col className='small-col' md={1}>
                      </Col>
                    }
                    {
                      index > 0 &&
                      <Col className='small-col' md={1}>
                        <h3>=</h3>
                      </Col>
                    }
                    {/* if LHS is active, then render LHS Form.Control */}
                    <Col md={6}>
                      { index == 0 &&
                        <Form.Control
                          id='left-racket'
                          type='text'
                          placeholder=''
                          value={LHSGoal}
                          readOnly
                        />
                      }
                      {
                        index > 0 &&
                          <Form.Control
                            id='left-racket'
                            type='text'
                            placeholder='Enter LHS Rule'
                            onChange={element => handleProofLineListChange(index, element, leftHandSideProofLineList)}
                          />
                      }
                    </Col> 
                    {/* if LHS is active, then render LHS Form.Control */}
                    <Col md={5}>
                      {
                        index == 0 &&
                        <Form.Control
                          id='left-rule'
                          type='text'
                          placeholder=''
                          //value={}
                          readOnly
                        />
                      }
                      { index > 0 &&
                        <Form.Control
                          id='left-rule'
                          type='text'
                          placeholder='Enter Rule for LHS'
                          onChange={element => handleProofLineListChange(index, element, leftHandSideProofLineList)}
                        />
                      }
                    </Col>
                    {/* This method simply removes a LHS line from the leftHandSideProofLineList by targeting its index in the array */}
                    <Col className='small-col' md={1}>
                      {                   
                        index ?
                          <Col md={1}>
                            { isLeftHandActive &&
                              <Button  variant='danger' onClick={() => 
                                removeProofLineLHS(index)}>x</Button>
                            }
                          </Col>
                          : null
                      }
                    </Col>
                  </Row>
                ))}

                <br></br>
                <Col md={1}>
                  { isLeftHandActive &&
                    <Button onClick={addNewProofLineLeftHandSide}>Add</Button>
                  }

                  {
                    !isLeftHandActive &&
                    <Button onClick={addNewProofLineRightHandSide}>Add</Button>
                  }
                  
                </Col>
               
              </Row>
            </Form.Floating>
          </Form.Group>
          
          <Col className='text-center'>
            <Button onClick={handleFormSubmission}>
              Submit
            </Button>
          </Col>
        </Form>   
        }

      </Container>
    </MainLayout>
  );
};

export default EquationalReasoningRacket;