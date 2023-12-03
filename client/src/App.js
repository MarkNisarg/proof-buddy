import React from 'react';
import AppRoutes from './routes'
import ErrorBoundary from './hoc/ErrorBoundary'
import AuthProvider from './context/AuthContext';

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
