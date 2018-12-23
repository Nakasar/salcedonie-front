import React, { Component } from 'react';
import AuthContextProvider from './Contexts/Auth/auth.context.provider';
import App from './App';

class AppWithContexts extends Component {
  render() {
    const { authState } = this.props;

    return (
      <AuthContextProvider>
        <App authState={authState} />
      </AuthContextProvider>
    );
  }
}

export default AppWithContexts;
