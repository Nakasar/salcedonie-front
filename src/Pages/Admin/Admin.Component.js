import React, {Component} from 'react';
import Card from "@material-ui/core/es/Card/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';

import { AccountBalance, Add } from '@material-ui/icons';

import withAuthContext from '../../Contexts/Auth/withAuthContext.context';
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  card: {
    minWidth: 275,
  },
});

class AdminComponent extends Component {
  state = {
    loading: true,
    users: [],
  };

  async componentDidMount() {
    const { authContext: { user }, userStore } = this.props;
    const users = await userStore.getUsers({}, { token: user.token });

    this.setState({
      loading: false,
      users,
    });
  }

  render() {
    const { classes } = this.props;

    const { loading, users } = this.state;

    if (loading) {
      return (
        <>
        </>
      );
    }

    return (
      <>
        <Card>
          <CardContent>
            <Grid container justify="space-between" spacing={16}>
              <Grid item>
                <Typography variant="h5" component="h2">
                  Utilisateurs
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" className={classes.button}>
                  Ajouter
                  <Add />
                </Button>
              </Grid>
            </Grid>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom d'utilisateur</TableCell>
                  <TableCell align="right">Identifiant Discord</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user._id}>
                    <TableCell component="th" scope="row">{user.username} {user.admin && <AccountBalance />}</TableCell>
                    <TableCell align="right">{user.discord_id}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default withAuthContext(withStyles(styles)(AdminComponent));
