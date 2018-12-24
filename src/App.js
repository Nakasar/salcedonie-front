import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from '@material-ui/core/styles';

import withAuthContext from './Contexts/Auth/withAuthContext.context';

import AppBar from './Components/AppBar.component';
import SideMenu from "./Components/SideMenu.component";
import LoginComponent from "./Components/Login.component";

const drawerWidth = 240;

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
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, authContext } = this.props;

    if (!authContext.user) {
      return (
        <LoginComponent/>
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

                <Route path='/events/'>
                  <h1>Events</h1>
                </Route>

                <Route path='/personnages/'>
                  <h1>Personnages</h1>
                </Route>

                <Route path='/lieux/'>
                  <h1>Lieux</h1>
                </Route>

                <Route path='/compte/'>
                  <h1>Mon Compte</h1>
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
