import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const withAuth = (Component) => {
  const AuthComponent = (props) => {
    if (!AuthService.isAuthenticated()) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
