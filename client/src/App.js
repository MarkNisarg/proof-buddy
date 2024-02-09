import React from 'react';
import AppRoutes from './routes';
import ErrorBoundary from './hoc/ErrorBoundary';
import AuthProvider from './context/AuthContext';

/**
 * The root component of the application.
 * It sets up the error boundary, authentication context, and routing for the app.
 */
const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
