// Package imports
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Local imports
import { APIContext } from '../../app';

const useStyles = makeStyles((them) => ({
}));

export const Admin = (props) => {
  const { employee, employees } = props.payload;
  const classes = useStyles();
  const appControls = useContext(APIContext);
  const name = employee.name;

  useEffect(() => {
    appControls.setPageTitle(`Admin: ${name}`);

    return () => {
      appControls.setPageTitle('');
    }
  }, []);

  return (
    <>
      {renderEmployees(employees, onEmployeeClick(appControls))}
    </>
  )
}

function onEmployeeClick(appControls) {
  return event => {
    //event.preventDefault();
    appControls.showNavBackButton(true);
  }
}


function renderEmployees(employees, callback) {
  const listItems = employees.map(employee => {
    const { name, id } = employee;
    return (
      <ListItem
        component={Link}
        to={`/employee/${id}`}
        onClick={callback}
      >
        <ListItemText primary={name} />
      </ListItem>
    )
  });

  return (
    <List>
      {listItems}
    </List>
  )
}