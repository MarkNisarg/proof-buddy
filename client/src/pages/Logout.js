import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import MainLayout from '../layouts/MainLayout';
import '../scss/_email-verification.scss';

/**
 * The Logout component handles the user logout process by invoking the logout function
 * from the AuthContext and removing the accessToken cookie.
 */
const Logout = () => {
  // Access logout function from AuthContext.
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    Cookies.remove('accessToken');
  }, [logout, navigate]);

  const handleGoLogin = () => {
    navigate('/login');
  };

  return (
    <MainLayout>
      <Container>
        <div className="logout-container">
          <h1>Logged Out Successfully!</h1>
          <p>Thank you for using Proof Buddy.</p>
          <div className='button-wrap'>
            <Button className='orange-btn' onClick={handleGoLogin}>Sign in Again</Button>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Logout;
