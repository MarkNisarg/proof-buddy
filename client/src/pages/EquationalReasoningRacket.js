import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import racketGeneration from '../services/erService';
import logger from '../utils/logger'
import '../scss/_equational-reasoning.scss'

const EquationalReasoningRacket = () => {

  const [isLeftHandActive, setIsLeftHandActive] = useState(true);

  const [proofName, setProofName] = useState('');

  const [LHSGoal, setLHSGoal] = useState('');

  const [RHSGoal, setRHSGoal] = useState('');

  const [currentLHS, setCurrentLHS] = useState('');

  const [currentRHS, setCurrentRHS] = useState('');

  const [leftHandSideProofLineList, setLeftHandSideProofLineList] = useState([{ proofLineRacket: '', proofLineRule: '' }]);

  const[rightHandSideProofLineList, setRightHandSideProofLineList] = useState([{ proofLineRacket: '', proofLineRule: '' }]);

  const gradient = {
    orange_gradient: 'linear-gradient(135deg, #ffc600 0, #ff8f1c 100%)',
    orange_gradient_reverse: 'linear-gradient(135deg, #ff8f1c 0, #ffc600 100%)'
  }

  const goalHighlightColors = {
    drexel_orange: '#FF8F1C',
    drexel_yellow: '#ffc600',
    drexel_light_blue: '#6CACE4',
    plain_white: '#FFFFFF'

  }

  const handleToggleLAndR = () => { //changes the state of wether left hand side is active or not. If true, then 'Left Hand Side' is active. If Fasle, then 'Rights Hand Side' is active
    setIsLeftHandActive(!isLeftHandActive);
  }

  const handleSaveProofRequest = () => {
    alert('Saving Current Proof!')

  }

  const handleUploadPoofRequest = () => {
    alert('Uploading Current Proof!')
  }

  const handleProofLineListChange = (index, element, targetList) => {// this function essentially makes sure that any user change to the input fields updates the corresponding ProofList
    let newProofLineList = [...targetList];

    if (element.target.id == 'left-racket' || element.target.id == 'right-racket'){
      newProofLineList[index].proofLineRacket = element.target.value;
      //console.log('Racket: ' + newProofLineList[index].proofLineRacket);
    } else if(element.target.id == 'left-rule' || element.target.id == 'right-rule') {
      newProofLineList[index].proofLineRule = element.target.value;
      //console.log('Rule: ' + newProofLineList[index].proofLineRule);
    } else {
      throw new Error('Error in creating racket and rules from input field.');
    }
  }

  //Creates JSON object of the target incoming parameter (which should be a JavaScript Object)
  const convertToJSON = (target) => {
    //alert(JSON.stringify(target)); //Testing Based Alert delete after testing is complete
    return JSON.stringify(target);
  }

  const convertFormToJSON = () => { // returns a JSON object of the present form
    let EquationalReasoningObject = { //basic form Object in JavaScript
      name: proofName, //String Proof Name
      leftRacketsAndRules: leftHandSideProofLineList, //Array of JavaScript Objects {proofline: '', proofRule: ''}
      rightRacketsAndRules: rightHandSideProofLineList //Array of JavaScript Objects {proofline: '', proofRule: ''}
    }
    return convertToJSON(EquationalReasoningObject);
  }

  const exportFormToLocalMachine = () => {
    //Phat, here you should call convertFormToJSON(), and use some kind of functionality to export this to a local machine.
    let forToExport = convertFormToJSON(); // should return a JSON Object of the form
    // 1) The first goal is to do this in JSON
    // 2) The second goal is to do this in Latex
  }

  const addLine = () => { //function that simply adds a new line to the list, and updates the react component accordingly
    if(isLeftHandActive){ //looks to see if left hand side is active
      setLeftHandSideProofLineList([...leftHandSideProofLineList, { proofLineRacket: '', proofLineRule: '' }]);
      setCurrentLHS(leftHandSideProofLineList[leftHandSideProofLineList.length -1].proofLineRacket);
    } else { //if right hand side is active
      setRightHandSideProofLineList([...rightHandSideProofLineList, { proofLineRacket: '', proofLineRule: '' }]);
      setCurrentRHS(rightHandSideProofLineList[rightHandSideProofLineList.length - 1].proofLineRacket);
    }
  }

  const removeProofLines = () => { //deletes lines from
    if (isLeftHandActive) {
      let target = findFirstBlankLine(leftHandSideProofLineList);
      if (confirm('Do you want to delete line number ' + target + ' and all lines after it')){
        removeEmptyLines(leftHandSideProofLineList, setLeftHandSideProofLineList);
      }
    } else if (!isLeftHandActive) {
      let target = findFirstBlankLine(rightHandSideProofLineList);
      if (confirm('Do you want to delete line number ' + target + ' and all lines after it')){
        removeEmptyLines(rightHandSideProofLineList, setRightHandSideProofLineList);
      }
    } else {
      logger.error('Error in deleting proof lines from client-side react component.', new Error('Deleting Lines Error'));
    }
  }

  const removeEmptyLines = (targetList, setterMethod) => { //helper function deletes the lines, creates shallow copy of spliced list, then sets new state to re-render react components
    for (let index = 0; index < targetList.length; index++) {
      let currentElement = targetList[index];
      if (index > 0){
        if (!currentElement.proofLineRacket || !currentElement.proofLineRule){
          let newList = targetList.slice(0, index);
          setterMethod(newList); //setter method initiates a re-render of react component
          break;
        }
      }
    }
  }

  const findFirstBlankLine = (targetList) => { // helper function that finds the fist instance of a blank line
    for (let index = 0; index < targetList.length; index++) {
      let currentElement = targetList[index];
      if (index > 0){
        if (!currentElement.proofLineRacket || !currentElement.proofLineRule){
          return index + 1;
        }
      }
    }

  }

  const handlePythonGeneration = async () => {//function wraps the logic for communicating 'Client's' 'Rule' to python-server for 'Racket' code generation
    if (isLeftHandActive) {
      if (leftHandSideProofLineList.length - 1 > 0) {
        handlePromiseWithPythonServer(leftHandSideProofLineList);
      } else {
        addLine(); //we use else here to add a new line so that we do not communicate null for the first line of the proof
      }
    } else {
      if (rightHandSideProofLineList.length - 1 > 0) {
        handlePromiseWithPythonServer(rightHandSideProofLineList);
      } else {
        addLine(); //we use else here to add a new line so that we do not communicate null for the first line of the proof
      }
    }
  }

  const handlePromiseWithPythonServer = async (targetList) => { //sends client 'Rule' to the python-server for 'Racket' code generation
    try {
      let response = await racketGeneration({ rule: targetList[targetList.length - 1].proofLineRule }); //we await a response from the python-server
      targetList[targetList.length - 1].proofLineRacket = response.racket;
      addLine(); //After a succesful response, we add a new line for the client to add more 'Rules' for 'Racket' code generation
    } catch (error) {
      logger.error('Error in front-end client and python-server communication when retrieving racket code from user generation', error);
    }

  }

  return (
    <MainLayout>
      <Container fluid style={{ paddingLeft: 10 }} className='equational-reasoning-racket-container'>
        <Form className='special-form' >
          <Form.Group id='er-proof-creation'>
            <Form.Floating>
              <Row id='fixed-row' style={isLeftHandActive ? { background: gradient.orange_gradient } : { background: gradient.orange_gradient_reverse }}>
                <Row >
                  <Col className='text-center'>
                    <h2 className='title-blue'>Equational Reasoning: Racket</h2>
                  </Col>
                </Row>

                <Row className='button-group-one'>
                  <Col className='text-center' md={{ span: 2, offset: 2 }}>
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
                      style={isLeftHandActive ? { background: goalHighlightColors.drexel_yellow, borderWidth: 4, borderColor: goalHighlightColors.plain_white } : { background: goalHighlightColors.plain_white }}
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
                      style={!isLeftHandActive ? { background: goalHighlightColors.drexel_yellow, borderWidth: 4, borderColor: goalHighlightColors.plain_white } : { background: goalHighlightColors.plain_white }}
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
                            value={racket.proofLineRacket}
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
                            className={'left-racket-' + index}
                            type='text'
                            placeholder='Racket for LHS'
                            value={racket.proofLineRacket}
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
                  </Row>
                ))}

                <br></br>
                <Col md={{ span: 2, offset: 0 }}>
                  <Button  variant='danger' onClick={removeProofLines}>Delete Line</Button>
                </Col>
                <Col md={{ span: 2, offset: 6 }} >
                  <Button variant='success' onClick={handlePythonGeneration}>Generate & Check</Button>
                </Col>
                <Col md={{ span: 1, offset: 0 }}>
                  <Button variant='success'>Substitution</Button>
                </Col>

              </Row>
            </Form.Floating>
          </Form.Group>

          <br></br>

          <Row className='text-center'>
            <Col md={{ span: 1, offset: 4 }}>
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
            <Col md={{ span: 1, offset: 2 }}>
              <Button>
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
