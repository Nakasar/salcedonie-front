import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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
                <form noValidate autoComplete="off">
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
                <Button variant="contained" color="primary" className={classes.button}>
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

export default withStyles(styles)(LoginComponent);
