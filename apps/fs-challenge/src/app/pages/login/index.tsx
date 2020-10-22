// Package imports
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Local imports
import { APIContext } from '../../app';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const formURL = '/api/login';

export const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const appControls = useContext(APIContext);
  const initialState = {
    email: '',
    password: '',
  };

  const [ state, setState ] = useState(initialState);
  const { email, password } = state;

  return (
    <Container component='div' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Log in
        </Typography>
        <form
          className={classes.form}
          onSubmit={onFormSubmit(state, formURL, history, appControls)}
          noValidate
        >
          <TextField
            onChange={handleChange('email', setState)}
            value={email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={handleChange('password', setState)}
            value={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log in
          </Button>
        </form>
      </div>
    </Container>
  )
}

/**
 * Takes the stateKey and setState function and
 * returns an event handler function used to update 
 * the state object with the given stateKey. State is
 * updated using event.target.value.
 * 
 * This function is used to create controlled components
 * out of each of the form field components.
 * 
 * For detailed docs see: https://reactjs.org/docs/forms.html
 * 
 * @param type 
 * @param setState 
 */
function handleChange(stateKey, setState) {
  return event => {
    const value = event.target.value;

    setState(prevState => {
      return {
        ...prevState,
        [stateKey]: value,
      }
    })
  }
}

/**
 * Takes state and a POST URL and sends the
 * state in JSON format to the API.
 * @param state 
 * @param URL
 * @param history // Controls browser history 
 */
function onFormSubmit(state, URL, history, appControls) {
  return async event => {
    event.preventDefault();

    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'content-type': 'application/json'
      }
    });

    const json = await response.json();
    const route = json.route;

    if (route == '/') {
      history.push('/');
      appControls.rehydrateAPI();
      console.log('should route to index');
    }

    console.log(`Form response: ${JSON.stringify(json)}`);
  }
}