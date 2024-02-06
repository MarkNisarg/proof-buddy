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

  const [isLeftHandActive, setIsLeftHandActive] = useState(true);
  
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

  const handleSaveProofRequest = () => {
    alert('Saving Current Proof!')
    
  }

  const handleUploadPoofRequest = () => {
    alert('Uploading Current Proof!')
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
  
  //Creates JSON object of the target incoming parameter (which should be a JavaScript Object)
  const convertToJSON = (target) => {
    alert(JSON.stringify(target)); //Testing Based Alert
    return JSON.stringify(target);
  }

  const handleFormSubmission = () => {
    let EquationalReasoningObject = {
      name: proofName, //String Proof Name
      leftRacketsAndRules: leftHandSideProofLineList, //Array of JavaScript Objects {proofline: '', proofRule: ''}
      rightRacketsAndRules: rightHandSideProofLineList //Array of JavaScript Objects {proofline: '', proofRule: ''}
    }
    convertToJSON(EquationalReasoningObject);
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
    if (confirm('Do you want to delete this line?')) {
      let newLeftHandSideList = [...leftHandSideProofLineList];
      newLeftHandSideList.splice(index, 1);
      setLeftHandSideProofLineList(newLeftHandSideList);
    }
  }

  const removeProofLineRHS = (index) => {
    if (confirm('Do you want to delete this line?')) {
      let newRightHandSideList = [...rightHandSideProofLineList];
      newRightHandSideList.splice(index, 1);
      setRightHandSideProofLineList(newRightHandSideList);
    }
    
  }

  return (
    <MainLayout>
      <Container fluid style={{paddingLeft: 10}} className='equational-reasoning-racket-container'>
        
        <Form className='special-form'>
          <Form.Group id='er-proof-creation'>
            <Form.Floating>
              <br></br>
              <Row id='fixed-row'>
                <Row >
                  <Col className='text-center'>
                    <h2 className='title-blue'>Equational Reasoning: Racket</h2>
                  </Col>
                </Row>
                
                <Row className='button-group-one'>
                  <Col className='text-center' md={{span: 2, offset: 2}}>
                    <Link to='/'>
                      <Button variant='danger'>Close Proof</Button>
                    </Link>
                  </Col>
                  <Col className='text-center' md={2}>
                    <Button>Definitions</Button>
                  </Col>
                  <Col className='text-center' md={2}>
                    <Button>View Rule Set</Button>  
                  </Col>
                  <Col className='text-center' md={2}>
                    <Button>Assertions</Button>  
                  </Col>
                </Row>
                
                <Row>
                  <Col md={1}>
                    <FormLabel>
                      <h4 className='title-blue'>Name:</h4>
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
                
                <Row>
                  <Col md={1}>
                    <h4 className='title-blue'>Goal:</h4>
                  </Col>
                  <Col>
                    <Form.Control
                      id='lhs-goal'
                      type='text'
                      placeholder='LHS Goal'
                      onChange={(element) => setLHSGoal(element.target.value)}
                    />
                  </Col>
                  <Col md={1} id='center-element-text' className='small-col'>
                    <h4 className='title-blue'>=</h4>
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
                <Row className='current-rhs-lhs-row'>
                  <Col>
                    <FormLabel>
                      <h4 className='title-blue'>Current LHS:</h4>
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
                      <h4 className='title-blue'>Current RHS:</h4>
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

              </Row>
              <br></br>
              <br></br>
              <Col className='text-center' id='rhs-lhs-toggle'>
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
              
              <Row>
                <Col md={1} className='small-col'>
                </Col>
                <Col>
                  <h4>Racket:</h4>
                </Col>
                <Col>
                </Col>
                <Col>
                  <h4>Rule:</h4>
                </Col>
              </Row>

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
                    <Col md={8}>
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
                            placeholder='RHS Racket'
                            onChange={element => handleProofLineListChange(index, element, rightHandSideProofLineList)}
                            //readOnly
                          />
                      }

                    </Col>
                    <Col md={3}>
                      {/* if LHS is inactive, then render RHS Form.Control */}
                      {
                        index == 0 &&
                        <Form.Control
                          id='right-rule'
                          type='text'
                          placeholder='Premise'
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
                    <Col md={8}>
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
                            placeholder='Racket for LHS'
                            onChange={element => handleProofLineListChange(index, element, leftHandSideProofLineList)}
                            //readOnly
                          />
                      }
                    </Col> 
                    {/* if LHS is active, then render LHS Form.Control */}
                    <Col md={3}>
                      {
                        index == 0 &&
                        <Form.Control
                          id='left-rule'
                          type='text'
                          placeholder='Premise'
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
                <Col md={{span: 1, offset: 7}} >
                  <Button variant='success'>Generate</Button>
                </Col>
                <Col md={1}>
                  <Button variant='success'>Substitutes</Button>
                </Col>
               
              </Row>
            </Form.Floating>
          </Form.Group>
          
          <br></br>
          
          <Row className='text-center'>
            <Col md={{span: 1, offset: 4}}>
              <Button>
                Download
              </Button>
            </Col>
            <Col md={1}>
              <Button onClick={handleUploadPoofRequest}>
                Upload
              </Button>
            </Col>
            <Col md={1}>
              <Button onClick={handleSaveProofRequest}>
                Save
              </Button>
            </Col>
            <Col md={{span: 1, offset: 2}}>
              <Button onClick={handleFormSubmission}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>   
        
      </Container>
    </MainLayout>
  );
};

export default EquationalReasoningRacket;