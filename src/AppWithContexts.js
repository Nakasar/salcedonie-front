import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { orange, teal } from '@material-ui/core/colors';
import AuthContextProvider from './Contexts/Auth/auth.context.provider';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange,
  },
});

class AppWithContexts extends Component {
  render() {
    const { authState } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <AuthContextProvider>
          <App authState={authState} />
        </AuthContextProvider>
      </MuiThemeProvider>
    );
  }
}

export default AppWithContexts;
