import React, { Component } from 'react';
import AuthContext from './Auth.context';

export default class AuthContextProvider extends Component {
  state = { user: null };

  logOut = () => {
    this.setState({ user: null });
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;
    const value = {
      user,
      logOut: this.logOut,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
}
