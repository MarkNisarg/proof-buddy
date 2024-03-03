/**
 * ER Form validations.
 */

/**
 * Validates a proof name.
 *
 * @param {string} proofName - The proof name to validate.
 * @returns {string} An empty string if the proof name is valid, otherwise an error message.
 */
const validateProofName = (proofName) => {
  let errorMessage = '';
  if (!proofName) {
    errorMessage = 'Please provide a proof name.';
  }

  return errorMessage;
};

/**
 * Validates a proof goal.
 *
 * @param {string} goal - The proof goal to validate.
 * @returns {string} An empty string if the proof goal is valid, otherwise an error message.
 */
const validateGoal = (goal) => {
  let errorMessage = '';
  if (!goal) {
    errorMessage = 'Please provide a proof goal.';
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
  switch (fieldName) {
    case 'proofName':
      return validateProofName(value);
    case 'lHSGoal':
      return validateGoal(value);
    case 'rHSGoal':
      return validateGoal(value);
    default:
      return '';
  }
};

export default validateField;
