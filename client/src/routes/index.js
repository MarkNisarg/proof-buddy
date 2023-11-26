import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SignUpUser from '../pages/SignUpUser';
import EmailVerification from '../pages/EmailVerification';
import EmailVerificationSuccess from '../pages/EmailVerificationSuccess';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home / >} />
        <Route path="/login" element={<Login / >} />
        <Route path="/signup" element={<SignUp / >} />
        <Route path="/signup/student" element={<SignUpUser role="student" / >} />
        <Route path="/signup/instructor" element={<SignUpUser role="instructor" / >} />
        <Route path="/verify-email" element={<EmailVerification / >} />
        <Route path="/verify-success" element={<EmailVerificationSuccess / >} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
