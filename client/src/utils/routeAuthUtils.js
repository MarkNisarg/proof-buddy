import React from 'react';
import withAuth from '../hoc/withAuth';
import withNoAuth from '../hoc/withNoAuth';

/**
 * RouteWithAuth is a Higher-Order Component that wraps
 * the provided component with authentication logic.
 * If the user is not authenticated, it will redirect them to a specified location.
 *
 * @param {object} props - The props object.
 * @param {React.ComponentType} props.component - The component to be rendered which requires authentication.
 * @returns {React.Component} - The wrapped component with authentication logic applied.
 */
const RouteWithAuth = ({ component: Component }) => {
  const WrappedComponent = withAuth(Component);
  return <WrappedComponent />;
};

/**
 * RouteWithNoAuth is a Higher-Order Component that wraps the provided component with logic
 * to ensure that it is only accessible by unauthenticated users.
 * If the user is authenticated, it will redirect them away from the component.
 *
 * @param {object} props - The props object containing a component and any additional props.
 * @param {React.ComponentType} props.component - The component to be rendered which should not be accessible by authenticated users.
 * @param {object} rest - Any additional props that should be passed to the wrapped component.
 * @returns {React.Component} - The wrapped component with non-authentication logic applied.
 */
const RouteWithNoAuth = ({ component: Component, ...rest }) => {
  const WrappedComponent = withNoAuth(Component);
  return <WrappedComponent {...rest} />;
};

export { RouteWithAuth, RouteWithNoAuth }
