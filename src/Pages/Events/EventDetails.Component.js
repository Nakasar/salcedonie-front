import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';

import withAuthContext from '../../Contexts/Auth/withAuthContext.context';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { EventAvailable, EventBusy, NavigateBefore } from "@material-ui/icons";
import Paper from "@material-ui/core/es/Paper/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import NewEventForm from "./NewEvent.Form";

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
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
  },
});

class EventDetailsComponent extends Component {
  state = {
    events: [],
    loading: true,
  };

  componentDidMount() {
    this.refreshEvent().then(() => {
      this.setState({ loading: false });
    });
  }

  refreshEvent = async () => {
    const { authContext: { user }, eventStore, eventId } = this.props;

    const event = await eventStore.getEvent({ id: eventId }, { token: user.token });

    this.setState({
      event,
    });
  };

  createEvent = async (event) => {
    console.log(event);
  };

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
                <Tooltip title="Retour" placement="left">
                  <Button color="primary" className={classes.button}>
                    <NavigateBefore />
                  </Button>
                </Tooltip>
              </Link>
            </Grid>
            <Grid item>
              <Typography component="h2" variant="h3" gutterBottom>
                {event.title}
              </Typography>
            </Grid>
            <Grid item style={{ marginLeft: '10px' }}>
              {event.archive ?
                <Tooltip title="Archivé" placement="right">
                  <EventBusy style={{ color: 'red' }}/>
                </Tooltip>
                :
                <Tooltip title="Actif" placement="right">
                  <EventAvailable style={{ color: 'green' }}/>
                </Tooltip>
              }
            </Grid>
          </Grid>

          <Typography variant="subtitle1">
            {event.description}
          </Typography>

          <Typography variant="body1">
            {event.text}
          </Typography>

          <Paper className={classes.paper}>
            <NewEventForm
              createEvent={this.createEvent}
              eventId={event._id}
              eventTitle={event.title}
            />
          </Paper>

          <Paper className={classes.paper}>

          </Paper>
        </Paper>
      </>
    );
  }
}

export default withAuthContext(withStyles(styles)(EventDetailsComponent));
