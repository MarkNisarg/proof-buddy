import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header nav-container">
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
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
            <Nav>
              <Nav.Link as={Link} to="/login">Log In</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
