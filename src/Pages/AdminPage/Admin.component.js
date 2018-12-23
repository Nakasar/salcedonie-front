import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

class AdminComponent extends Component {
  render() {
    return (
      <>
        <h1>Administration</h1>
        <h2>Gestion des comptes</h2>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </>
    );
  }
}

export default AdminComponent;