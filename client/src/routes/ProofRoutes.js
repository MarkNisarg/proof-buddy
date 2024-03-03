import React from 'react';
import { Route } from 'react-router-dom';
import EquationalReasoningRacket from '../pages/EquationalReasoningRacket';
import NaturalDeductionFirstOrderLogic from '../pages/NaturalDeductionFirstOrderLogic';
import NaturalDeductionPropositionalLogic from'../pages/NaturalDeductionPropositionalLogic';
import { RouteWithAuth } from '../utils/routeAuthUtils';
import ERRacket from '../pages/ERRacket';

/**
 * A component that renders a group of routes related to proof process.
 *
 * @returns {React.Fragment} A fragment containing the defined routes.
 */
const ProofRoutes = () => {
  return (
    <>
      <Route path="/er-racket" element={<RouteWithAuth component={ERRacket} />} />
      <Route path="/EquationalReasoningRacket" element={<RouteWithAuth component={EquationalReasoningRacket} />} />
      <Route path="/NaturalDeductionFirstOrderLogic" element={<RouteWithAuth component={NaturalDeductionFirstOrderLogic} />} />
      <Route path="/NaturalDeductionPropositionalLogic" element={<RouteWithAuth component={NaturalDeductionPropositionalLogic} />} />
    </>
  );
};

export default ProofRoutes;
