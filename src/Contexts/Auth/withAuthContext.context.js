import React, { Component } from 'react';
import AuthContext from './Auth.context';

const withAuthContext = WrappedComponent => {
  class withAuthContext extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {authContext => <WrappedComponent authContext={authContext} {...this.props} />}
        </AuthContext.Consumer>
      );
    }
  }

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  withAuthContext.displayName = `Authenticated(${wrappedComponentName})`;

  return withAuthContext;
};

export default withAuthContext;
