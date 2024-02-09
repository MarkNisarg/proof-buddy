import { useState } from 'react';

/**
 * A custom hook for managing form input states in React components.
 * This hook initializes form input values and provides a method to update these values based on user input.
 *
 * @param {Object} initialValues - An object containing the initial values of the form inputs.
 * @returns {Array} - Returns an array containing the current form values and a handleChange function to update the values based on input changes.
 *
 * @example
 * const [formValues, handleInputChange] = useInputState({ name: '', email: '' });
 * <input name="name" value={formValues.name} onChange={handleInputChange} />
 * <input name="email" value={formValues.email} onChange={handleInputChange} />
 */
const useInputState = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return [
    values,
    handleChange
  ];
};

export { useInputState };
