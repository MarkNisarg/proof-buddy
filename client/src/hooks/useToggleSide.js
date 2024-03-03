import { useState } from 'react';

/**
 * A custom hook for toggling between two sides, typically 'LHS' (left-hand side)
 * and 'RHS' (right-hand side). This hook manages a state that represents the current
 * side. It's useful for scenarios where you need to toggle between LHS and RHS of the proof.
 *
 * @param {string} initialSide - The initial side to display, defaults to 'LHS'.
 * @returns {Array} An array containing the current side ('LHS' or 'RHS')
 * and a function to toggle between the sides.
 *
 * @example
 * const [side, toggleSide] = useToggleSide();
 * <div>Current Side: {side}</div>
 * <button onClick={toggleSide}>Toggle Side</button>
 */
const useToggleSide = (initialSide = 'LHS') => {
  const [side, setSide] = useState(initialSide);

  const toggleSide = () => {
    setSide(prevSide => prevSide === 'LHS' ? 'RHS' : 'LHS');
  };

  return [side, toggleSide];
};

export { useToggleSide };
