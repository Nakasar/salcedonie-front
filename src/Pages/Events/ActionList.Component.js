import React, {Component} from 'react';
import withAuthContext from "../../Contexts/Auth/withAuthContext.context";
import {withStyles} from "@material-ui/core";

const styles = theme => ({

});

class ActionListComponent extends Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}

export default withAuthContext(withStyles(styles)(ActionListComponent));