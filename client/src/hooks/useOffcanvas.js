import { useState } from 'react';

const useOffcanvas = (initialState=false) => {

  const [isOffcanvasActive, setIsOffCanvasActive] = useState(initialState);

  const toggleOffcanvas = () => {
    setIsOffCanvasActive(previousState => previousState === false ? true : false);
  };

  return [
    isOffcanvasActive, 
    toggleOffcanvas
  ];

}

export { useOffcanvas }