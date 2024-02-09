import { useState } from 'react';

/**
 * A hook to handle server error messages, providing a way to set
 * and retrieve a user-friendly error message.
 *
 * @returns {Array} The server error message and a function to set this message based on an error object.
 *
 * @example
 * const [serverError, handleServerError] = useServerError();
 * {serverError && <p className="error">{serverError}</p>}
 */
const useServerError = () => {
  const [serverError, setServerError] = useState('');

  const handleServerError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      setServerError(error.response.data.message);
    } else {
      setServerError('An unexpected error occurred.');
    }
  };

  return [
    serverError,
    handleServerError
  ];
};

export { useServerError };
