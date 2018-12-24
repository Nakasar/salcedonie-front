import React, {Component} from 'react';
import Card from "@material-ui/core/es/Card/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';

import withAuthContext from '../../Contexts/Auth/withAuthContext.context';
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import {TextField} from "@material-ui/core";

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class AccountComponent extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    const { authContext: { user }, userStore } = this.props;

    const userFound = await userStore.getUser({ id: user.data.user_id }, { token: user.token });
    const { username, discord_id } = userFound;
    this.setState({
      username,
      discord_id,
      loading: false,
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    const { loading, username, discord_id } = this.state;

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
            <Typography variant="h5" component="h2">
              Informations Générales
            </Typography>
            <TextField
              id="username"
              label="Nom d'utilisateur"
              value={username}
              onChange={this.handleChange('username')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="off"
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="discord_id"
              autoComplete="off"
              label="Numéro de compte discord"
              value={discord_id}
              onChange={this.handleChange('discord_id')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              helperText="Obtenez-le à l'aide de la commande '!rp id' avec le bot discord."
              type="number"
              margin="normal"
              variant="outlined"
            />
          </CardContent>
        </Card>
      </>
    );
  }
}

export default withAuthContext(withStyles(styles)(AccountComponent));
