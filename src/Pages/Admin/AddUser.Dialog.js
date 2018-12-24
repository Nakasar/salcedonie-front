import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";

export default class FormDialog extends React.Component {
  state = {
    username: '',
    discord_id: '',
    password: '',
    error: {
      username: null,
      discord_id: null,
      password: null,
      other: null,
    },
  };

  generateRandomPassword = () => {
    this.setState({
      password: Math.random().toString(36).slice(-8),
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const { handleClose, createUser } = this.props;
    const { username, discord_id, password } = this.state;

    const error = {};
    if (!username) {
      error.username = "Veuillez indiquer un nom d'utilisateur.";
    } else if (!/^[a-zA-Z\u00C0-\u017F ]{3,50}$/.test(username)) {
      error.username = "Ce nom d'utilisateur n'est pas valide. Seuls les lettres (et accents) sont autorisées.";
    }

    if (!discord_id) {
      error.discord_id = 'Veuillez indiquer un nom identifiant discord valide.';
    } else if (!/^[0-9]{11}$/.test(discord_id)) {
      error.discord_id = 'Un identifiant discord contient onze chiffres.';
    }

    if (!password) {
      error.password = 'Veuillez indiquer un mot de passe valide.';
    } else if (!/^[a-zA-Z0-9]{8,30}$/.test(password)) {
      error.password = 'Un mot de passe valide est composé de 8  à 30 lettres et chiffres.';
    }

    if (Object.keys(error).length > 0) {
      this.setState({ error });
      return;
    }

    try {
      await createUser({ username, discord_id, password });

      handleClose();
    } catch(err) {
      if (err.response) {
        switch (err.response.status) {
          case 409:
            if (err.response.data.error.name === 'EXISTING_USERNAME') {
              error.username = "Ce nom d'utilisateur est déjà utilisé.";
            }
            if (err.response.data.error.name === 'EXISTING_DISCORD_ID') {
              error.discord_id = 'Cet identifiant discord est déjà utilisé.';
            }
            break;
          default:
            error.other = 'Une erreur inconnue est survenue.';
        }
      } else {
        error.other = 'Une erreur inconnue est survenue.';
      }

      this.setState({ error });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { open, handleClose } = this.props;
    const { username, discord_id, password, error } = this.state;

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          onEnter={this.generateRandomPassword}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ajouter un utilisateur</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour ajouter un utilisateur, vous devez fournir un nom d'utilisateur unique.
              Vous pouvez également modifier le mot de passe généré.
            </DialogContentText>
            <form id="newUserForm" onSubmit={this.onSubmit}>
              <TextField
                autoFocus
                error={error.username && true}
                margin="dense"
                id="username"
                value={username}
                onChange={this.handleChange('username')}
                label="Nom d'utilisateur"
                fullWidth
                helperText={error.username}
                required
              />
              <TextField
                error={error.password && true}
                margin="dense"
                id="password"
                value={password}
                onChange={this.handleChange('password')}
                label="Mot de passe"
                fullWidth
                helperText={error.password}
                required
              />
              <TextField
                error={error.discord_id && true}
                margin="dense"
                id="discord_id"
                value={discord_id}
                onChange={this.handleChange('discord_id')}
                label="Identifiant discord"
                fullWidth
                helperText={error.discord_id}
                required
              />
            </form>
            <Typography variant="body1" color="error">
              {error.other}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button color="primary" type="submit" form="newUserForm">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}