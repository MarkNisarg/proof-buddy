import React from 'react';
import AppRoutes from './routes'
import ErrorBoundary from './hoc/ErrorBoundary'

const App = () => {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
};

export default App;
