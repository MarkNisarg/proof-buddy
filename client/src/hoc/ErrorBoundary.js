import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  // Error handling logic.
  const handleError = (error, errorInfo) => {
    setHasError(true);
    setErrorInfo(errorInfo);
    console.error('Caught an error:', error, errorInfo);
  };

  // Setting up the error boundary using useEffect and ErrorBoundary.
  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      handleError(error, errorInfo);
    };

    window.addEventListener('error', errorHandler);
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div>
        <h1>Something went wrong.</h1>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {errorInfo}
        </details>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
