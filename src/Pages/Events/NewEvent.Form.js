import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

class NewEventForm extends Component {
  state = {
    title: '',
    date: '',
    hour: '',
    location: '',
    eventId: '',
    eventTitle: '',
    description: '',
    character: '',
  };

  componentDidMount() {
    const { eventId, eventTitle } = this.props;

    if (eventId && eventTitle) {
      this.setState({ eventId, eventTitle });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = async event => {
    event.preventDefault();

    const { createEvent } = this.props;

    const { title, date, hour, location, eventId, description, character } = this.state;

    await createEvent({ title, date, hour, location, eventId, description, character });
  }

  render() {
    const { classes } = this.props;

    const { title, date, hour, location, event, description, character } = this.state;

    return (
     <>
       <form id="newAction" onSubmit={this.onSubmit}>
         <Typography component="h3" variant="h4">
           Poster un message
         </Typography>
         <TextField
           id="title"
           label="Titre"
           className={classes.textField}
           value={title}
           onChange={this.handleChange('title')}
           margin="normal"
           variant="outlined"
         />
         <TextField
           id="date"
           label="Date"
           className={classes.textField}
           value={date}
           onChange={this.handleChange('date')}
           margin="normal"
           variant="outlined"
         />
         <TextField
           id="hour"
           label="Heure"
           className={classes.textField}
           value={hour}
           onChange={this.handleChange('hour')}
           margin="normal"
           variant="outlined"
         />
         <TextField
           id="location"
           label="Lieu"
           className={classes.textField}
           value={location}
           onChange={this.handleChange('location')}
           margin="normal"
           variant="outlined"
         />
         <TextField
           id="character"
           label="Personnage"
           className={classes.textField}
           value={character}
           onChange={this.handleChange('character')}
           margin="normal"
           variant="outlined"
         />
         <TextField
           id="description"
           label="Message"
           className={classes.textField}
           value={description}
           onChange={this.handleChange('description')}
           margin="normal"
           variant="outlined"
           fullWidth
           multiline
           rows="5"
         />
         <Button variant="contained" color="primary" type="submit" form="newAction">Poster</Button>
       </form>
     </>
    );
  }
}

export default withStyles(styles)(NewEventForm);