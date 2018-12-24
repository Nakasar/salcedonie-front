import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from '@material-ui/core/styles';
import { AccountCircle, Announcement, Event, ExitToApp, Home, LibraryBooks, Settings, Store, SupervisorAccount } from '@material-ui/icons';

import withAuthContext from '../Contexts/Auth/withAuthContext.context';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: 'none',
  },
  linkActive: {
    color: 'blue !important',
  },
});

class SideMenu extends Component {
  render() {
    const { classes, authContext, location: { pathname } } = this.props;
    const activeLink = pathname.split('/')[1];

    console.log(activeLink);

    return (
      <>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <NavLink to='/' className={classes.link}>
            <ListItem button key='Accueil' selected={activeLink === ''}>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary='Accueil' />
            </ListItem>
          </NavLink>
          <NavLink to='/general' className={classes.link}>
            <ListItem button key='Résumé' selected={activeLink === 'general'}>
              <ListItemIcon><Announcement /></ListItemIcon>
              <ListItemText primary='Résumé' />
            </ListItem>
          </NavLink>
          <NavLink to='/regles' className={classes.link}>
            <ListItem button key='Règles' selected={activeLink === 'regles'}>
              <ListItemIcon><LibraryBooks /></ListItemIcon>
              <ListItemText primary='Règles' />
            </ListItem>
          </NavLink>
          {authContext.user.data.is_admin &&
            <NavLink to='/admin' className={classes.link}>
              <ListItem button key='Administration' selected={activeLink === 'admin'}>
                <ListItemIcon><Settings/></ListItemIcon>
                <ListItemText primary='Administration'/>
              </ListItem>
            </NavLink>
          }
        </List>
        <Divider />
        <List>
          <NavLink to='/events' className={classes.link} activeClassName={classes.linkActive}>
            <ListItem button key='Events' selected={activeLink === 'events'}>
              <ListItemIcon><Event /></ListItemIcon>
              <ListItemText primary='Events' />
            </ListItem>
          </NavLink>
          <NavLink to='/personnages' className={classes.link} activeClassName={classes.linkActive}>
            <ListItem button key='Personnages' selected={activeLink === 'personnages'}>
              <ListItemIcon><SupervisorAccount /></ListItemIcon>
              <ListItemText primary='Personnages' />
            </ListItem>
          </NavLink>
          <NavLink to='/lieux' className={classes.link} activeClassName={classes.linkActive}>
            <ListItem button key='Lieux' selected={activeLink === 'lieux'}>
              <ListItemIcon><Store /></ListItemIcon>
              <ListItemText primary='Lieux' />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          <NavLink to='/compte' className={classes.link} activeClassName={classes.linkActive}>
            <ListItem button key='Mon Compte' selected={activeLink === 'compte'}>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary='Mon Compte' />
            </ListItem>
          </NavLink>
          <ListItem button key='Déconnexion' onClick={authContext.logOut}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary='Déconnexion' />
          </ListItem>
        </List>
      </>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(withAuthContext(withStyles(styles, { withTheme: true })(SideMenu)));