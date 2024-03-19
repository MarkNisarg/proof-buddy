import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import MainLayout from '../layouts/MainLayout';
import validateField from '../utils/eRFormValidationUtils';
import OffcanvasRuleSet from '../components/OffcanvasRuleSet';
import { useToggleSide } from '../hooks/useToggleSide';
import { useOffcanvas } from '../hooks/useOffcanvas';
import { useInputState } from '../hooks/useInputState';
import { useFormValidation } from '../hooks/useFormValidation';
import { useGoalCheck } from '../hooks/useGoalCheck';
import { useRacketRuleFields } from '../hooks/useRacketRuleFields';
import { useCurrentRacketValues } from '../hooks/useCurrentRacketValues';
import { useFormSubmit } from '../hooks/useFormSubmit';
import { useHighlight } from '../hooks/useHighlight';
import '../scss/_forms.scss';
import '../scss/_er-racket.scss';
import { useExportToLocalMachine } from '../hooks/useExportToLocalMachine';
import { useDoubleClick } from '../hooks/useDoubleClick';

/**
 * ERRacket component facilitates the Equational Reasoning Racket.
 */
const ERRacket = () => {
  const initialValues = {
    proofName: '',
    proofTag: '',
    lHSGoal: '',
    rHSGoal: ''
  }

  const [showSide, toggleSide] = useToggleSide();
  const [formValues, handleChange] = useInputState(initialValues);
  const [validationMessages, handleBlur, setAllTouched, isFormValid] = useFormValidation(formValues, validateField);
  const [validated, setValidated] = useState(false);
  const [isGoalChecked, checkGoal, goalValidationMessage, enhancedHandleChange] = useGoalCheck(handleChange);
  const [handleHighlight, startPosition] = useHighlight();
  const [racketRuleFields, addFieldWithApiCheck, removeEmptyLines, handleFieldChange, validationErrors, serverError] = useRacketRuleFields(startPosition);
  const [currentLHS, currentRHS] = useCurrentRacketValues(racketRuleFields);
  const [isOffcanvasActive, toggleOffcanvas] = useOffcanvas();
  
  const handleDoubleClick = useDoubleClick();

  const handleERRacketSubmission = async () => {
    alert('We are stilling working on proof submission!');
  };

  const { handleSubmit } = useFormSubmit(isFormValid, setValidated, setAllTouched, handleERRacketSubmission);

  /**
   * Creates JSON object of the target incoming parameter (which should be a JavaScript Object)
   */
  const convertToJSON = (target) => {
    return JSON.stringify(target);
  }

  /**
   * Returns a JSON object of the present form
   */
  const convertFormToJSON = () => {
    //This is a Front End Proof Object placeholder
    //In the future we will be using a Proof Object sent from the python-server
    let EquationalReasoningObject = {
      name: formValues.proofName,
      leftRacketsAndRules: racketRuleFields.LHS,
      rightRacketsAndRules: racketRuleFields.RHS
    }

    return convertToJSON(EquationalReasoningObject);
  }

  const exportJSON = useExportToLocalMachine(formValues.proofName, convertFormToJSON());

  return (
    <MainLayout>
      <Container className='er-racket-container'>
        <OffcanvasRuleSet isActive={isOffcanvasActive} toggleFunction={toggleOffcanvas}></OffcanvasRuleSet>
        <Form noValidate validated={validated} className='er-racket-form' onSubmit={handleSubmit}>
          <div className='form-top-section'>
            <Row className='page-header-row'>
              <Col>
                <h1>Equational Reasoning: Racket</h1>
              </Col>
            </Row>

            <Row>
              <Form.Group as={Col} md="3" className='er-proof-name'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="eRProofName"
                    name="proofName"
                    type="text"
                    placeholder="Enter name"
                    value={formValues.proofName}
                    onBlur={() => handleBlur('proofName')}
                    onChange={handleChange}
                    isInvalid={!!validationMessages.proofName}
                    required
                  />
                  <label htmlFor="eRProofName">Name</label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {validationMessages.proofName}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>
              <Form.Group as={Col} md="3" className='er-proof-tag'>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="eRProofTag"
                    name="proofTag"
                    type="text"
                    placeholder="Enter tag"
                    value={formValues.proofTag}
                    onBlur={() => handleBlur('proofTag')}
                    onChange={handleChange}
                  />
                  <label htmlFor="eRProofTag"># Tag</label>
                </Form.Floating>
              </Form.Group>
              <Dropdown as={Col} className="d-inline proof-dropdown-btn proof-utilities">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  Proof Utilities
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Assertions</Dropdown.Item>
                  <Dropdown.Item href="#">Definitions</Dropdown.Item>
                  <Dropdown.Item onClick={toggleOffcanvas} href="#">View Rule Set</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>

            <Row className="g-5">
              <Form.Group as={Col} md="6" className="er-proof-goal-lhs">
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="eRProofLHSGoal"
                    name="lHSGoal"
                    type="text"
                    placeholder="LHS Goal"
                    value={formValues.lHSGoal}
                    onBlur={() => handleBlur('lHSGoal')}
                    onChange={enhancedHandleChange}
                    isInvalid={!!validationMessages.lHSGoal || !!goalValidationMessage.LHS}
                    required
                  />
                  <label htmlFor="eRProofLHSGoal">LHS Goal</label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {validationMessages.lHSGoal || goalValidationMessage.LHS}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <Form.Group as={Col} md="6" className="er-proof-goal-rhs">
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="eRProofRHSGoal"
                    name="rHSGoal"
                    type="text"
                    placeholder="RHS Goal"
                    value={formValues.rHSGoal}
                    onBlur={() => handleBlur('rHSGoal')}
                    onChange={enhancedHandleChange}
                    isInvalid={!!validationMessages.rHSGoal || !!goalValidationMessage.RHS}
                    required
                  />
                  <label htmlFor="eRProofRHSGoal">RHS Goal</label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {validationMessages.rHSGoal || goalValidationMessage.RHS}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>
            </Row>

            <Row className="er-current-state">
              <Form.Group as={Col} md="5" className={`er-proof-current-lhs ${showSide === 'LHS' ? 'active' : ''}`}>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="eRProofCurrentLHS"
                    name="proofCurrentLHS"
                    type="text"
                    placeholder="Current LHS"
                    value={currentLHS}
                    readOnly
                  />
                  <label htmlFor="eRProofCurrentLHS">Current LHS</label>
                </Form.Floating>
              </Form.Group>

              <Form.Group as={Col} md="5" className={`er-proof-current-rhs ${showSide === 'RHS' ? 'active' : ''}`}>
                <Form.Floating className="mb-3">
                  <Form.Control
                    id="eRProofCurrentRHS"
                    name="proofCurrentRHS"
                    type="text"
                    placeholder="Current RHS"
                    value={currentRHS}
                    readOnly
                  />
                  <label htmlFor="eRProofCurrentRHS">Current RHS</label>
                </Form.Floating>
              </Form.Group>
            </Row>

            <Form.Text as={'div'} id="formSeparator" className='form-separator'></Form.Text>
          </div>

          <div className="form-bottom-part">
            <Row className="switch-btn-wrap">
              <Col>
                <Button variant="secondary" size="lg" className="switch-btn" onClick={toggleSide}>
                  {showSide === 'LHS' ? 'Switch to Right Hand Side ⋙' : '⋘ Switch to Left Hand Side'}
                </Button>
              </Col>
            </Row>

            {!isGoalChecked[showSide] && (
              <Row className='goal-btn-wrap'>
                <Button className='orange-btn'
                  onClick={() => checkGoal(showSide, formValues[`${showSide[0].toLowerCase()}HSGoal`])}>
                  Check {showSide} Goal
                </Button>
              </Row>
            )}

            {isGoalChecked[showSide] && (
              <div className='racket-rule-container-wrap'>
                <div className="racket-rule-wrap" id="racket-rule">
                  {serverError && <Alert variant={'danger'}>{serverError}</Alert>}

                  {showSide === 'LHS' && (
                    <div className="racket-rule-lhs" id="racket-rule-lhs">
                      {/* Static Row Always Present */}
                      <Row className="racket-rule-row">
                        <Form.Group as={Col} md="8" className='er-proof-current-goal'>
                          <Form.Floating className="mb-3">
                            <Form.Control
                              id="eRProofCurrentLHSGoal"
                              name="proofCurrentLHSGoal"
                              type="text"
                              value={formValues.lHSGoal}
                              placeholder="Current Goal"
                              onChange={handleChange}
                              onSelect={(e) => handleHighlight(e)}
                              onDoubleClick={(e) => handleDoubleClick(e)}
                              //readOnly
                            />
                            <label htmlFor="eRProofCurrentLHSGoal">LHS Goal</label>
                          </Form.Floating>
                        </Form.Group>

                        <Form.Group as={Col} md="4" className='er-proof-premise'>
                          <Form.Floating className="mb-3">
                            <Form.Control
                              id="eRProofLHSPremise"
                              name="proofeRProofLHSPremise"
                              type="text"
                              value="Premise"
                              placeholder="LHS Premise"
                              onChange={handleChange}
                              readOnly
                            />
                            <label htmlFor="eRProofLHSPremise">LHS Premise</label>
                          </Form.Floating>
                        </Form.Group>
                      </Row>

                      {/* Dynamically Added Racket and Rule Fields */}
                      {racketRuleFields.LHS.map((field, index) => (
                        <Row className="racket-rule-row" key={`LHS-field-${index}`}>
                          <Form.Group as={Col} md="8" className='er-proof-racket'>
                            <Form.Floating className="mb-3">
                              <Form.Control
                                id={`eRProofLHSRacket-${index}`}
                                name={`eRProofLHSRacket_${index}`}
                                type="text"
                                placeholder="LHS Racket"
                                value={field.racket}
                                onChange={(e) => handleFieldChange(showSide, index, 'racket', e.target.value)}
                                onSelect={(e) => handleHighlight(e)}
                                onDoubleClick={(e) => handleDoubleClick(e)}
                              />
                              <label htmlFor={`eRProofLHSRacket-${index}`}>LHS Racket</label>
                            </Form.Floating>
                          </Form.Group>

                          <Form.Group as={Col} md="4" className='er-proof-rule'>
                            <Form.Floating className="mb-3">
                              <Form.Control
                                id={`eRProofLHSRule-${index}`}
                                name={`eRProofLHSRule_${index}`}
                                type="text"
                                placeholder="LHS Rule"
                                value={field.rule}
                                onChange={(e) => handleFieldChange(showSide, index, 'rule', e.target.value)}
                                isInvalid={!!validationErrors.LHS[index]}
                                required
                              />
                              <label htmlFor={`eRProofLHSRule-${index}`}>LHS Rule</label>
                              <Form.Control.Feedback type="invalid" tooltip>
                                {validationErrors.LHS[index]}
                              </Form.Control.Feedback>
                            </Form.Floating>
                          </Form.Group>
                        </Row>
                      ))}
                    </div>
                  )}

                  {showSide === 'RHS' && (
                    <div className="racket-rule-rhs" id="racket-rule-rhs">
                      {/* Static Row Always Present */}
                      <Row className="racket-rule-row">
                        <Form.Group as={Col} md="8" className='er-proof-current-goal'>
                          <Form.Floating className="mb-3">
                            <Form.Control
                              id="eRProofCurrentRHSGoal"
                              name="proofCurrentRHSGoal"
                              type="text"
                              value={formValues.rHSGoal}
                              placeholder="Current Goal"
                              onChange={handleChange}
                              readOnly
                            />
                            <label htmlFor="eRProofCurrentRHSGoal">RHS Goal</label>
                          </Form.Floating>
                        </Form.Group>

                        <Form.Group as={Col} md="4" className='er-proof-premise'>
                          <Form.Floating className="mb-3">
                            <Form.Control
                              id="eRProofRHSPremise"
                              name="proofeRProofRHSPremise"
                              type="text"
                              value="Premise"
                              placeholder="RHS Premise"
                              onChange={handleChange}
                              readOnly
                            />
                            <label htmlFor="eRProofRHSPremise">RHS Premise</label>
                          </Form.Floating>
                        </Form.Group>
                      </Row>

                      {/* Dynamically Added Racket and Rule Fields */}
                      {racketRuleFields.RHS.map((field, index) => (
                        <Row className="racket-rule-row" key={`RHS-field-${index}`}>
                          <Form.Group as={Col} md="8" className='er-proof-racket'>
                            <Form.Floating className="mb-3">
                              <Form.Control
                                id={`eRProofRHSRacket-${index}`}
                                name={`eRProofRHSRacket_${index}`}
                                type="text"
                                placeholder="RHS Racket"
                                value={field.racket}
                                onChange={(e) => handleFieldChange(showSide, index, 'racket', e.target.value)}
                                onSelect={(e) => handleHighlight(e)}
                              />
                              <label htmlFor={`eRProofRHSRacket-${index}`}>RHS Racket</label>
                            </Form.Floating>
                          </Form.Group>

                          <Form.Group as={Col} md="4" className='er-proof-rule'>
                            <Form.Floating className="mb-3">
                              <Form.Control
                                id={`eRProofRHSRule-${index}`}
                                name={`eRProofRHSRule_${index}`}
                                type="text"
                                placeholder="RHS Rule"
                                value={field.rule}
                                onChange={(e) => handleFieldChange(showSide, index, 'rule', e.target.value)}
                                isInvalid={!!validationErrors.RHS[index]}
                                required
                              />
                              <label htmlFor={`eRProofRHSRule-${index}`}>RHS Rule</label>
                              <Form.Control.Feedback type="invalid" tooltip>
                                {validationErrors.RHS[index]}
                              </Form.Control.Feedback>
                            </Form.Floating>
                          </Form.Group>
                        </Row>
                      ))}
                    </div>
                  )}
                </div>

                <div className='button-row-wrap'>
                  <Row className="button-row">
                    <Col md="8">
                      <Button className='orange-btn delete-btn' onClick={() => removeEmptyLines(showSide)}>Delete Line</Button>
                    </Col>
                    <Col md="4" className="rules-btn-grp">
                      <Button className='orange-btn green-btn' onClick={() => addFieldWithApiCheck(showSide)}>Generate & Check</Button>
                      <Button className='orange-btn green-btn'>Substitution</Button>
                    </Col>
                  </Row>
                </div>

                <div className="proof-opr-wrap">
                  <Row className='proof-oprs'>
                    <Dropdown as={Col} className="d-inline proof-dropdown-btn proof-operations">
                      <Dropdown.Toggle id="dropdown-autoclose-true">
                    File Operations
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={exportJSON}>Download Proof</Dropdown.Item>
                        <Dropdown.Item href="#">Upload Proof</Dropdown.Item>
                        <Dropdown.Item href="#">Save Proof</Dropdown.Item>
                        <Dropdown.Item href="#">Submit Proof</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Row>
                </div>
              </div>
            )}
          </div>
        </Form>
      </Container>
    </MainLayout>
  );
};

export default ERRacket;
