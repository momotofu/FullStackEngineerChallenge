// Package imports
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  ButtonGroup,
  Paper,
  Grid,
} from '@material-ui/core'; 
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';

// Local imports
import { APIContext } from '../../app';
import { useStateFromProp } from '../../utils';

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginBottom: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(2)
  }
}));

export const Admin = (props) => {
  const { admin, employees } = props;
  const [ employeeList, setEmployeeList ] = useStateFromProp(employees);
  const classes = useStyles();
  const appControls = useContext(APIContext);
  const name = admin.name;

  useEffect(() => {
    appControls.setPageTitle(`Admin: ${name}`);

    return () => {
      appControls.setPageTitle('');
    }
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography className={classes.title} component='h1' variant='h5'>
            Employees
          </Typography>
          {renderEmployees(employeeList, classes, onEmployeeClick(appControls))}
          <Button
            component={Link}
            to='/employee/null/edit'
            fullWidth
            onClick={onAddEmployeeClick(appControls)}
          >
            <AddCircleIcon color='primary' fontSize='large'/>
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

function onAddEmployeeClick(appControls) {
  return event => {
    appControls.showNavBackButton(true);
  }
}

function onEmployeeClick(appControls) {
  return event => {
    appControls.showNavBackButton(true);
  }
}

function renderEmployees(employees, classes, callback) {
  const listItems = employees.map(employee => {
    const { name, id } = employee;
    return (
      <Paper className={classes.listItem} key={id}>
        <ListItem
          component={Link}
          to={`/employee/${id}/view`}
          onClick={callback}
        >
          <ListItemText primary={name} />
          <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Button>edit</Button>
            <Button>delete</Button>
          </ButtonGroup>
        </ListItem>
      </Paper>
    )
  });

  return (
    <List>
      {listItems}
    </List>
  )
}