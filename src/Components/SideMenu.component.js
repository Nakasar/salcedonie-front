import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
  }
});

class SideMenu extends Component {
  render() {
    const { classes, authContext } = this.props;

    return (
      <>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <Link to='/' className={classes.link}>
            <ListItem button key='Accueil'>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary='Accueil' />
            </ListItem>
          </Link>
          <Link to='/general' className={classes.link}>
            <ListItem button key='Résumé'>
              <ListItemIcon><Announcement /></ListItemIcon>
              <ListItemText primary='Résumé' />
            </ListItem>
          </Link>
          <Link to='/regles' className={classes.link}>
            <ListItem button key='Règles'>
              <ListItemIcon><LibraryBooks /></ListItemIcon>
              <ListItemText primary='Règles' />
            </ListItem>
          </Link>
          {authContext.user.data.is_admin &&
            <Link to='/admin' className={classes.link}>
              <ListItem button key='Administration'>
                <ListItemIcon><Settings/></ListItemIcon>
                <ListItemText primary='Administration'/>
              </ListItem>
            </Link>
          }
        </List>
        <Divider />
        <List>
          <Link to='/events' className={classes.link}>
            <ListItem button key='Events'>
              <ListItemIcon><Event /></ListItemIcon>
              <ListItemText primary='Events' />
            </ListItem>
          </Link>
          <Link to='/personnages' className={classes.link}>
            <ListItem button key='Personnages'>
              <ListItemIcon><SupervisorAccount /></ListItemIcon>
              <ListItemText primary='Personnages' />
            </ListItem>
          </Link>
          <Link to='/lieux' className={classes.link}>
            <ListItem button key='Lieux'>
              <ListItemIcon><Store /></ListItemIcon>
              <ListItemText primary='Lieux' />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to='/compte' className={classes.link}>
            <ListItem button key='Mon Compte'>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary='Mon Compte' />
            </ListItem>
          </Link>
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

export default withAuthContext(withStyles(styles, { withTheme: true })(SideMenu));