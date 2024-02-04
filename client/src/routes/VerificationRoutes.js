import React from 'react';
import { Route } from 'react-router-dom';
import EmailVerification from '../pages/EmailVerification';
import VerificationSuccess from '../pages/VerificationSuccess';
import { RouteWithNoAuth } from '../utils/routeAuthUtils';
import ResetPasswordVerification from '../pages/ResetPasswordVerification';

/**
 * A component that renders a group of routes related to verification process.
 *
 * @returns {React.Fragment} A fragment containing the defined routes.
 */
const VerificationRoutes = () => {
  return (
    <>
      <Route path="/verify-email" element={<RouteWithNoAuth component={EmailVerification} />} />
      <Route path="/verify-success" element={<RouteWithNoAuth component={VerificationSuccess} context="emailSuccess" />} />
      <Route path="/reset-password/verify" element={<RouteWithNoAuth component={ResetPasswordVerification} />} />
      <Route path="/reset-password/success" element={<RouteWithNoAuth component={VerificationSuccess} context="resetSuccess" />} />
    </>
  );
};

export default VerificationRoutes;
