/**
 * ER Form validations.
 */

/**
 * Validates a proof field.
 *
 * @param {string} value - The proof field value.
 * @returns {string} An empty string if the proof name is valid, otherwise an error message.
 */
const validateProofField = (value, message) => {
  let errorMessage = '';
  if (!value) {
    errorMessage = message;
  }

  return errorMessage;
};

/**
 * Validates a specific ER form field.
 *
 * @param {string} fieldName - The name of the field to validate.
 * @param {string} value - The value of the field to validate.
 * @returns {string} An empty string if the field is valid, otherwise an error message.
 */
const validateField = (fieldName, value) => {
  if (fieldName === 'proofName') {
    return validateProofField(value, 'Please provide a proof name.');
  }
  else if (fieldName === 'lHSGoal') {
    return validateProofField(value, 'Please provide a LHS goal.');
  }
  else if (fieldName === 'rHSGoal') {
    return validateProofField(value, 'Please provide a RHS goal.');
  }
  else {
    return '';
  }
};

export default validateField;
