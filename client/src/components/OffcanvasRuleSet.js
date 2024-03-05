import React from 'react';
import OffCanvas from 'react-bootstrap/Offcanvas'
import Table from 'react-bootstrap/Table'
import ruleSet from './RuleSet';

/**
 *  OffcanvasRuleSet component that displays at the bottom of the application in the "er-racket" page when the user presses the "View Rule Set" Button.
 * It uses react-bootstrap's components.
 */

const OffcanvasRuleSet = ({ isActive, toggleFunction }) => {
  
  /* Present list of Rules for View Rule Set Offcanvas */
  const rules = ruleSet();
  return (
    <OffCanvas className='Offcanvas' id='rule-set' show={isActive} onHide={toggleFunction}  scroll='true' placement='bottom'>
      <OffCanvas.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                To/From
              </th>
              <th>
                From/To
              </th>
              <th>
                Name
              </th>
              <th>
                Tag
              </th>
            </tr> 
          </thead>
          <tbody>
            {
              rules.map((rule, index) => (
                <tr key={index}>
                  <td>
                    { rule.toFrom }
                  </td>
                  <td>
                    { rule.fromTo }
                  </td>
                  <td>
                    { rule.name }
                  </td>
                  <td>
                    { rule.tags }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </OffCanvas.Body>
    </OffCanvas>
  );
};

export default OffcanvasRuleSet;