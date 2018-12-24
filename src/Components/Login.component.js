import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import withAuthContext from '../Contexts/Auth/withAuthContext.context';

import Background from '../resources/images/salcedonie.background.png';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  textField: {
  },
});

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  signIn = async (event) => {
    event.preventDefault();

    const { authStore, authContext } = this.props;
    const { username, password } = this.state;

    if (!username) {
      console.error('Username is required');
      return;
    }
    if (!password) {
      console.error('Password is required');
      return;
    }

    try {
      const token = await authStore.signIn({ username, password });

      authContext.signIn({ username, token });

      try {
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
      } catch (err) {
        console.error('Could not save user session.');
      }
    } catch(err) {
      console.error(err);
    }
  };

  render() {
    const { classes } = this.props;
    const { username, password } = this.state;

    return (
      <div style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover' }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={3}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Connexion
                </Typography>
                <form id="signIn" onSubmit={this.signIn} noValidate autoComplete="off">
                  <TextField
                    id="outlined-username"
                    label="Nom d'utilisateur"
                    className={classes.textField}
                    value={username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="outlined-password"
                    label="Mot de passe"
                    className={classes.textField}
                    type="password"
                    value={password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Typography variant="caption" gutterBottom>
                    Pas de compte ou mot de passe oublié ? Contactez votre MJ.
                  </Typography>
                </form>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" className={classes.button} form="signIn" type='submit'>
                  Se connecter
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withAuthContext(withStyles(styles)(LoginComponent));
