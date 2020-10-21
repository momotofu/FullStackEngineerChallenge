// Package imports
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Local imports
import { APIContext } from '../../app';

const useStyles = makeStyles((them) => ({
  container: {
    marginTop: '64px',
  },
  title: {
    flexGrow: 1,
  }
}));

export const Page = (props) => {
  const { children, showNav, title, showBackButton } = props;
  const history = useHistory();
  const classes = useStyles();
  const appControls = useContext(APIContext);
  const logoutURL = '/api/logout';

  return (
    <Container className={classes.container} component='main' maxWidth='lg'>
      <CssBaseline />
      { showNav 
          ? <AppBar>
              <Toolbar>
                { showBackButton
                    ? renderBackButton(history, appControls)
                    : ''
                }
                <Typography className={classes.title} variant='h6'>
                  {title}
                </Typography>
                <Button
                  onClick={onLogoutClick(logoutURL, appControls)}>
                    Logout
                </Button>
              </Toolbar>
            </AppBar>
          : ''
      }
      {children}
    </Container>
  )
}

function renderBackButton(history, appControls) {
  const onClick = (event) => {
    appControls.showNavBackButton(false);
    history.goBack();
  }

  return (
    <Button onClick={onClick}>
      Back
    </Button>
  )
}

function onLogoutClick(URL, appControls) {
  return async event => {
    const response = await fetch(URL);
    const json = await response.json();

    appControls.logoutUser();
    console.log(`Form response: ${JSON.stringify(json)}`);
  }
}