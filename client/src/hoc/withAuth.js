import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

/**
 * A HOC that wraps a given Component to protect it with authentication logic.
 * It checks if the user is authenticated and either renders the component or redirects to the login page.
 *
 * @param {React.ComponentType} Component - The React component to be wrapped and protected.
 * @return {Function} AuthComponent - A new component that includes the authentication logic.
 */
const withAuth = (Component) => {
  const AuthComponent = (props) => {
    if (!authService.isAuthenticated()) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
