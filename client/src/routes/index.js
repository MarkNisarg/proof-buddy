import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/Logout'
import SignUp from '../pages/SignUp';
import SignUpUser from '../pages/SignUpUser';
import EmailVerification from '../pages/EmailVerification';
import EmailVerificationSuccess from '../pages/EmailVerificationSuccess';
import withAuth from '../hoc/withAuth'
import withNoAuth from '../hoc/withNoAuth'

const RouteWithNoAuth = ({ component: Component }) => {
  const WrappedComponent = withNoAuth(Component);
  return <WrappedComponent />;
};

const RouteWithAuth = ({ component: Component }) => {
  const WrappedComponent = withAuth(Component);
  return <WrappedComponent />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home / >} />
        <Route path="/login" element={<RouteWithNoAuth component={Login} />} />
        <Route path="/logout" element={<RouteWithAuth component={Logout} / >} />
        <Route path="/signup" element={<RouteWithNoAuth component={SignUp} />} />
        <Route path="/signup/student" element={<RouteWithNoAuth component={SignUpUser} role="student" / >} />
        <Route path="/signup/instructor" element={<RouteWithNoAuth component={SignUpUser} role="instructor" / >} />
        <Route path="/verify-email" element={<RouteWithNoAuth component={EmailVerification} / >} />
        <Route path="/verify-success" element={<RouteWithNoAuth component={EmailVerificationSuccess} / >} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
