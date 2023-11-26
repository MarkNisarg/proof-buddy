import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../scss/Header.scss';

const Header = () => {
  return (
    <header className={`header nav-container`}>
      <Navbar collapseOnSelect expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Proof Buddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" aria-label="Toggle navigation" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Help" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="#">Version Log</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#">Report Bug / Feedback</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="#">About</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav as={'ul'}>
              <Nav.Item as={'li'}>
                <Nav.Link as={Link} to="/login" className="login">Log In</Nav.Link>
              </Nav.Item>
              <Nav.Item as={'li'}>
                <Nav.Link as={Link} to="/signup" className="signup">Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
