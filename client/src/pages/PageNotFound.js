import React from 'react';
import Container from 'react-bootstrap/Container';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import '../scss/_page-not-found.scss';

/**
 * PageNotFound component displays a custom 404 error page.
 *
 * This component is displayed whenever a user navigates to a route that does not match.
 */
const PageNotFound = () => {
  return (
    <MainLayout>
      <Container className="text-center page-not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you were looking for appears to have been moved, deleted, or does not exist. We appreciate your patience and apologize for any inconvenience.</p>
        <p>In the meantime, use the navigation above to access our content or <Link to="/">go back to the homepage</Link>.</p>
      </Container>
    </MainLayout>
  );
};

export default PageNotFound;
