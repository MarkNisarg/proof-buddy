import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SignUpUser from '../pages/SignUpUser';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home / >} />
        <Route path="/login" element={<Login / >} />
        <Route path="/signup" element={<SignUp / >} />
        <Route path="/signup/student" element={<SignUpUser role="student" / >} />
        <Route path="/signup/instructor" element={<SignUpUser role="instructor" / >} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
