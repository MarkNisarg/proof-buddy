import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import AuthRoutes from './AuthRoutes';
import VerificationRoutes from './VerificationRoutes';
import ProofRoutes from './ProofRoutes';

/**
 * The main routing component of the application.
 */
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {AuthRoutes()}
        {VerificationRoutes()}
        {ProofRoutes()}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
