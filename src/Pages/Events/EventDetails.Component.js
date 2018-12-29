import React, {Component} from 'react';
import Card from "@material-ui/core/es/Card/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';

import withAuthContext from '../../Contexts/Auth/withAuthContext.context';
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { NavigateBefore } from "@material-ui/icons";
import Paper from "@material-ui/core/es/Paper/Paper";

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  link: {
    textDecoration: 'none',
  },
  paper: {
    padding: '10px',
  },
});

class EventDetailsComponent extends Component {
  state = {
    events: [],
    loading: true,
  };

  async componentDidMount() {
    await this.refreshEvent();
  }

  async refreshEvent() {
    const { authContext: { user }, eventStore, eventId } = this.props;

    const event = await eventStore.getEvent({ id: eventId }, { token: user.token });

    this.setState({
      event,
      loading: false,
    });
  }

  render() {
    const { classes } = this.props;

    const { loading, event } = this.state;

    if (loading) {
      return (
        <>
        </>
      );
    }

    return (
      <>
        <Paper className={classes.paper}>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Link to={'/events'}>
                <Button color="primary" className={classes.button}>
                  <NavigateBefore />
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Typography component="h2" variant="h3" gutterBottom>
                {event.title}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1">
            {event.description}
          </Typography>
          <Typography variant="body1">
            {event.text}
          </Typography>
          <Paper>

          </Paper>
        </Paper>
      </>
    );
  }
}

export default withAuthContext(withStyles(styles)(EventDetailsComponent));
