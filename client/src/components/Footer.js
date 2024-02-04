import React from 'react';
import Container from 'react-bootstrap/Container';
import '../scss/_footer.scss';

/**
 * Footer component that displays at the bottom of the application.
 * It uses react-bootstrap's components.
 */
const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <Container className="text-center">
        <span>Developed with &#9829; by Drexel University</span>
      </Container>
    </footer>
  );
};

export default Footer;
