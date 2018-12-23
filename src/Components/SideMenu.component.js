import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from '@material-ui/core/styles';
import { AccountCircle, Announcement, Event, Home, Store, SupervisorAccount } from '@material-ui/icons';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

class SideMenu extends Component {
  render() {
    const { classes, theme } = this.props;

    return (
      <>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button key='Accueil'>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary='Accueil' />
          </ListItem>
          <ListItem button key='Résumé'>
            <ListItemIcon><Announcement /></ListItemIcon>
            <ListItemText primary='Résumé' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key='Events'>
            <ListItemIcon><Event /></ListItemIcon>
            <ListItemText primary='Events' />
          </ListItem>
          <ListItem button key='Personnages'>
            <ListItemIcon><SupervisorAccount /></ListItemIcon>
            <ListItemText primary='Personnages' />
          </ListItem>
          <ListItem button key='Lieux'>
            <ListItemIcon><Store /></ListItemIcon>
            <ListItemText primary='Lieux' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key='Mon Compte'>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText primary='Mon Compte' />
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

export default withStyles(styles, { withTheme: true })(SideMenu);