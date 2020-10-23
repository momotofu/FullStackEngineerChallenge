// Package imports
import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import { Modal } from '../../components/modal';
import { useStateFromProp } from '../../utils';

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginBottom: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#efefef',
      transition: 'all, .3s ease'
    },
  },
  title: {
    marginBottom: theme.spacing(2)
  }
}));

export const Admin = (props) => {
  const { admin, employees } = props;
  const [ employeeList, setEmployeeList ] = useStateFromProp(employees);
  const [ onDeleteConfirm, setOnDeleteConfirm ] = useState({ func: () => {}});
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ deleteName, setDeleteName ] = useState('');
  const history = useHistory();
  const classes = useStyles();
  const appControls = useContext(APIContext);
  const name = admin.name;

  useEffect(() => {
    console.log('onDeleteConfirm', onDeleteConfirm);
  }, [onDeleteConfirm])

  useEffect(() => {
    appControls.setPageTitle(`Admin: ${name}`);

    return () => {
      appControls.setPageTitle('');
    }
  }, []);

  console.log('isModalOpen', isModalOpen);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography className={classes.title} component='h1' variant='h5'>
            Employees
          </Typography>
          {renderEmployees(
            employeeList,
            classes,
            onListItemClick(history, appControls),
            onInputClick(appControls),
            deleteButtonHandler(
              setDeleteName,
              setIsModalOpen,
              setOnDeleteConfirm,
              appControls,
            )
           )}
          <Button
            component={Link}
            to='/employee/null/edit'
            fullWidth
            onClick={onInputClick(appControls)}
          >
            <AddCircleIcon color='primary' fontSize='large'/>
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={isModalOpen}
        handleConfirm={onDeleteConfirm.func}
        handleClose={onModalClose(setIsModalOpen)}
        title={`Delete Employee: ${deleteName}`}
        message={`Are you sure you want to delete the employee named ${deleteName}`}
        cancelLabel='Cancel'
        confirmLabel='Confirm'
      />
    </>
  )
}

function onModalClose(setIsModalOpen) {
  return event => {
    setIsModalOpen(false);
  }
}

function deleteButtonHandler(
  setDeleteName,
  setIsModalOpen,
  setOnDeleteConfirm,
  appControls
) {
  return (id, name) => {
    async function confirmDeleteHandler() {
      const response = await fetch(`/api/employee/${id}`, {
        method: 'DELETE'
      })

      const json = await response.json();

      setIsModalOpen(false);
      setOnDeleteConfirm({ func: () => {} });
      appControls.rehydrateAPI();

      console.log(`Delete response: ${JSON.stringify(json)}`);
    };

    return event => {
      event.preventDefault();
      setOnDeleteConfirm({ func: confirmDeleteHandler });
      setDeleteName(name);
      setIsModalOpen(true);
    }
  }
}

function onInputClick(appControls) {
  return event => {
    appControls.showNavBackButton(true);
  }
}

function onListItemClick(history, appControls) {
  return url => {
    return event => {
      if (event.target.className === 'MuiButton-label') {
        return;
      }
    
      event.preventDefault();
      history.push(url)
      appControls.showNavBackButton(true);
    }
  }
}

function renderEmployees(
  employees,
  classes,
  listItemHandler,
  editButtonHandler,
  deleteButtonHandler
) {
  const listItems = employees.map(employee => {
    const { name, id } = employee;
    return (
      <Paper className={classes.listItem} key={id}>
        <ListItem
          onClick={listItemHandler(`/employee/${id}/view`)}
        >
          <ListItemText primary={name} />
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button onClick={editButtonHandler} component={Link} to={`/employee/${id}/edit`}>edit</Button>
            <Button onClick={deleteButtonHandler(id, name)}>delete</Button>
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