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

  const [bracketList, setBracketList] = useState([{ Bracket: ''}])

  const handleBracketListChange = (i, e) => {
    let newBracketList = [...bracketList];
    newBracketList[i][e.target.name] = e.target.value;
    setBracketList(newBracketList);

  }

  const addNewBracketLine = () => {
    setBracketList([...bracketList, {Bracket: ''}]);
  }

  const removeBracketLine = (i) => {
    let newBracketList = [...bracketList];

    //must list bracket names.... Something is wrong with removal
    for (i=0; i < newBracketList.length; i++) {
      console.log(newBracketList[i].name);
    }

    bracketList.splice(i, 1);
    console.log(newBracketList.length);
    setBracketList(newBracketList);
  }
  
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
              {/* Using Map to Create Input fields for Brackets */}
              <Row className='text-center'>
                {bracketList.map((bracket, index) => (
                  <Row key={index}>
                    <Col md={3}>
                      <Form.Control
                        id='leftBracket'
                        type='text'
                        placeholder='Enter Bracket'
                        onChange={e => handleBracketListChange(index, e)}
                      />
                    </Col>

                    <Col md={3}>
                      <h2>=</h2>
                    </Col>

                    <Col md={3}>
                      <Form.Control
                        id='rightBracket'
                        type='text'
                        placeholder='Enter Bracket'
                      />
                    </Col>
                    {
                      index ?
                        <Col md={2}>
                          <Button  variant='danger' onClick={() => removeBracketLine(index)}>Remove</Button>
                        </Col>
                        : null
                    }
                  </Row>
 
                ))}
                <br></br>
                <Col md={1}>
                  <Button onClick={addNewBracketLine}>Add Line</Button>
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