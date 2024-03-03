import { useState, useEffect } from 'react';

/**
 * A custom hook that tracks the current LHS and RHS racket values based on the latest entries
 * in the provided dynamic fields arrays for LHS and RHS.
 *
 * @param {Object} racketRuleFields - The current state of the racket and rule fields.
 * @returns {Array} Current LHS and RHS racket values.
 */
const useCurrentRacketValues = (racketRuleFields) => {
  const [currentLHS, setCurrentLHS] = useState('');
  const [currentRHS, setCurrentRHS] = useState('');

  useEffect(() => {
    const findLastNonEmptyRacket = (fields) => {
      for (let i = fields.length - 1; i >= 0; i--) {
        const field = fields[i];
        if (field.racket.trim() !== '' && field.rule.trim() !== '') {
          return field.racket;
        }
      }
      return '';
    };

    const lastNonEmptyLHS = findLastNonEmptyRacket(racketRuleFields.LHS);
    const lastNonEmptyRHS = findLastNonEmptyRacket(racketRuleFields.RHS);

    setCurrentLHS(lastNonEmptyLHS);
    setCurrentRHS(lastNonEmptyRHS);
  }, [racketRuleFields.LHS, racketRuleFields.RHS]);

  return [ currentLHS, currentRHS ];
};

export { useCurrentRacketValues };
