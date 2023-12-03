import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../scss/_main-layout.scss';

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
