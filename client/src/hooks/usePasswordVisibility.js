import { useState } from 'react';

/**
 * A custom hook for toggling password visibility in form inputs.
 * This hook manages a boolean state that represents the visibility of a password.
 *
 * @returns {Array} An array containing the current input type ('text' or 'password')
 * and a function to toggle the visibility of the password.
 *
 * @example
 * const [passwordInputType, togglePasswordVisibility] = usePasswordVisibility();
 * <input type={passwordInputType} />
 * <button onClick={togglePasswordVisibility}>Show/Hide Password</button>
 */
const usePasswordVisibility = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return [
    visible ? 'text' : 'password',
    toggleVisibility
  ];
};

export { usePasswordVisibility };
