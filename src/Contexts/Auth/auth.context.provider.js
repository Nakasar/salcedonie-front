import React, { Component } from 'react';
import AuthContext from './Auth.context';

export default class AuthContextProvider extends Component {
  state = { user: null };

  logOut = () => {
    this.setState({ user: null });
  };

  signIn = ({ username, token, data }) => {
    this.setState({
      user: {
        username,
        token,
        data,
      },
    });
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;
    const value = {
      user,
      logOut: this.logOut,
      signIn: this.signIn,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
}
