import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../scss/_main-layout.scss';

/**
 * MainLayout serves as a layout wrapper for the application.
 */
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-container">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
