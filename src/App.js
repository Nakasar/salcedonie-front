import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from '@material-ui/core/styles';

import withAuthContext from './Contexts/Auth/withAuthContext.context';

import AppBar from './Components/AppBar.component';
import SideMenu from "./Components/SideMenu.component";
import LoginComponent from "./Components/Login.component";
import AccountComponent from './Pages/Account/Account.Component';
import EventsComponent from './Pages/Events/Events.Component';
import AdminComponent from "./Pages/Admin/Admin.Component";

import AuthStore from './Stores/Auth.store';
import UserStore from './Stores/User.Store';
import EventStore from './Stores/Event.store';

const drawerWidth = 240;
const API_URL = 'http://localhost:5000';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class App extends Component {
  authStore = new AuthStore({ apiUrl: API_URL });
  userStore = new UserStore({ apiUrl: API_URL });
  eventStore = new EventStore({ apiUrl: API_URL });

  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      loading: true,
    };
  }

  componentDidMount() {
    const { authContext } = this.props;

    try {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');

      if (username && token) {
        const data = JSON.parse(atob(token.split('.')[1]));

        authContext.signIn({ username, token, data });
      }
    } catch (err) {
      console.log('No credentials found.');
    }

    this.setState({ loading: false });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, authContext } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    if (!authContext.user) {
      return (
        <LoginComponent authStore={this.authStore} />
      );
    }

    return (
      <div className={classes.root}>
        <Router>
          <>
            <AppBar title="Salcedonie" handleDrawerToggle={this.handleDrawerToggle} />
            <nav className={classes.drawer}>
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden smUp implementation="css">
                <Drawer
                  container={this.props.container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <SideMenu/>
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
                >
                  <SideMenu/>
                </Drawer>
              </Hidden>
            </nav>

            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route path='/' exact>
                  <h1>Accueil</h1>
                </Route>

                <Route path='/general'>
                  <h1>Vue générale</h1>
                </Route>

                <Route path='/admin' render={(props) => (
                  <AdminComponent
                    userStore={this.userStore}
                  />
                )} />

                <Route path='/events' render={({ match }) => (
                  <EventsComponent
                    match={match}
                    eventStore={this.eventStore}
                  />
                )} />

                <Route path='/personnages'>
                  <h1>Personnages</h1>
                </Route>

                <Route path='/lieux'>
                  <h1>Lieux</h1>
                </Route>

                <Route path='/compte' render={() => (
                  <AccountComponent
                    userStore={this.userStore}
                  />
                )} />

                <Route>
                  <h1>404</h1>
                </Route>
              </Switch>
            </main>
          </>
        </Router>
      </div>
    );
  }
}

export default withAuthContext(withStyles(styles, { withTheme: true })(App));
