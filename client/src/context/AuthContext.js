import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import UserService from '../services/UserService';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        const userData = await UserService.getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const login = async () => {
    await fetchUserData();
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Hook for easy access to the auth context.
export const useAuth = () => {
  return useContext(AuthContext);
};
