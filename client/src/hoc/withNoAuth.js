import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const withNoAuth = (Component) => {
  const NoAuthComponent = (props) => {
    if (AuthService.isAuthenticated()) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };

  return NoAuthComponent;
};

export default withNoAuth;
