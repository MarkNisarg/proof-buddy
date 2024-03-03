import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

/**
 * A higher-order component (HOC) designed to wrap around components that
 * should only be accessible to unauthenticated users.
 *
 * @param {React.ComponentType} Component - The component to wrap with the no-authentication logic.
 * @returns {Function} NoAuthComponent - A new component that incorporates the logic for authenticated users.
 */
const withNoAuth = (Component) => {
  const NoAuthComponent = (props) => {
    if (authService.isAuthenticated()) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };

  return NoAuthComponent;
};

export default withNoAuth;
