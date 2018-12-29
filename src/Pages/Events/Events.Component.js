import React, {Component} from 'react';
import Card from "@material-ui/core/es/Card/Card";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';

import withAuthContext from '../../Contexts/Auth/withAuthContext.context';
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link, Route} from "react-router-dom";

import EventDetails from "./EventDetails.Component";

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
  }
});

class EventsComponent extends Component {
  state = {
    events: [],
    loading: true,
  };

  async componentDidMount() {
    await this.refreshEvents();
  }

  async refreshEvents() {
    const { authContext: { user }, eventStore } = this.props;

    const events = await eventStore.getEvents({}, { token: user.token });

    this.setState({
      events,
      loading: false,
    });
  }

  render() {
    const { classes, eventStore, match } = this.props;

    const { loading, events } = this.state;

    if (loading) {
      return (
        <>
        </>
      );
    }

    return (
      <>
        <Route path={`${match.path}/:id`} render={({ match }) => (
          <EventDetails eventId={match.params.id} eventStore={eventStore} />
        )} />
        <Route
          exact
          path={match.path}
          render={() => (
            <Grid container spacing={24}>
              <Grid>
                <Grid item>
                  <Typography variant="h5" component="h2">
                    Evènements
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                {events.map(event => (
                  <Grid item xs>
                    <Card>
                      <CardHeader
                        title={event.title}
                      />
                      <CardContent>
                        <Typography component="p">
                          {event.description}
                        </Typography>
                        <hr/>
                        <Typography component="p">
                          {event.text}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link to={`/events/${event._id}`} className={classes.link}>
                          <Button size="small" color='primary'>Timeline</Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        />
      </>
    );
  }
}

export default withAuthContext(withStyles(styles)(EventsComponent));
