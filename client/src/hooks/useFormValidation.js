import { useState, useEffect } from 'react';

/**
 * A custom hook for handling form validation in React components.
 * It tracks which fields have been touched and validates fields only if they've been touched.
 *
 * @param {Object} formValues - An object representing the form's current values.
 * @param {Function} validateField - A function that takes a field name, its value, and all form values, then returns a validation message if the field is invalid.
 * @returns {Array} - An array containing the validation messages object, a handleBlur function to mark fields as touched, a setAllTouched function to mark all fields as touched, and an isFormValid function to check if the form is valid.
 *
 * @example
 * const [formValues, setFormValues] = useState({ name: '', email: '' });
 * const [validationMessages, handleBlur, setAllTouched, isFormValid] = useFormValidation(formValues, validateField);
 */
const useFormValidation = (formValues, validateField) => {
  const [validationMessages, setValidationMessages] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const touchedFields = Object.keys(touched).filter(field => touched[field]);
    const validationMessages = touchedFields.reduce((acc, field) => {
      acc[field] = validateField(field, formValues[field], formValues);
      return acc;
    }, {});

    setValidationMessages(validationMessages);
  }, [formValues, touched, validateField]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const setAllTouched = () => {
    const allTouched = Object.keys(formValues).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
  };

  const isFormValid = () => {
    return !Object.values(validationMessages).some(msg => msg);
  }

  return [
    validationMessages,
    handleBlur,
    setAllTouched,
    isFormValid
  ];
};

export { useFormValidation };
