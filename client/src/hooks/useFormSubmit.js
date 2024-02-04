/**
 * Custom hook for handling form submission in React components.
 * It performs client-side validation before executing the provided action function.
 *
 * @param {boolean} isFormValid - A function that returns a boolean indicating if the form is valid.
 * @param {Function} setValidated - Function to update the state indicating the form has been validated.
 * @param {Function} setAllTouched - Function to mark all form fields as touched, typically to show validation errors.
 * @param {Function} action - The action to be executed if the form passes validation. Expected to be an async function.
 *
 * @returns {Object} - Returns an object containing the handleSubmit function that should be used as the form's onSubmit handler.
 *
 * @example
 * const { handleSubmit } = useFormSubmit(isFormValid, setValidated, setAllTouched, action);
 * Where `action` is the action to execute on successful validation.
 */
const useFormSubmit = (isFormValid, setValidated, setAllTouched, action) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    setAllTouched();

    setValidated(true);

    const form = event.currentTarget;
    if (!form.checkValidity() || !isFormValid()) {
      event.stopPropagation();
      return false;
    }

    return action();
  };

  return {
    handleSubmit
  };
};

export { useFormSubmit };
