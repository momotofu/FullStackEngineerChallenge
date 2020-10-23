import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import {
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Avatar,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Local imports
import { APIContext } from '../../app';

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: '180px',
    height: '180px',
    marginBottom: theme.spacing(4),
  },
  listItem: {
    marginBottom: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  }
}));

export enum Mode {
  Edit = 'EDIT',
  View = 'VIEW',
}

const initalEmployee = {
  photoURL: '',
  bio: '',
  name: '',
  email: '',
  isAdmin: false,
  reviews: [],
  assignedReviews: [],
}

export const Employee = (props) => {
  const { admin } = props;
  const [ employee, setEmployee ] = useState(initalEmployee);
  const { id, state } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const appControls = useContext(APIContext);
  const [ onSaveURL, method ] = getURLAndMethod(id);

  // If not admin, user cannot edit profile
  let mode: Mode = state == 'edit' && admin !== undefined
    ? Mode.Edit
    : Mode.View;

  const {
    photoURL,
    bio,
    name,
    email,
    reviews,
    isAdmin,
    assignedReviews,
  } = employee;

  useEffect(() => {
    // No need to fetch an employ because we're creating one.
    if (id === 'null') {
      return;
    }

    if (admin === undefined) {
      appControls.showNavBackButton(false);
    }

    // Fetch employee data from the API
    const url = `/api/employee/${id}`;

    fetch(url)
      .then(r => r.json())
      .then(res => {
        const { employee } = res;

        setEmployee(employee);
      });

  }, []);
  
  /**
   * If there is an admin, show reviews owned by employee.
   * If mode is edit, enable text fields
   * If id param is create then make a employee
   * Trigger rehydrate
   */
  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Avatar alt={name} src={photoURL} className={classes.avatar} />
        {renderTextField(mode, name, 'Name', classes, onInputClick('name', setEmployee))}
        {mode == Mode.Edit
          ? renderTextField(mode, photoURL, 'Photo URL', classes, onInputClick('photoURL', setEmployee))
          : ''
        }
        {renderTextField(mode, email, 'Email', classes, onInputClick('email', setEmployee))}
        {renderTextField(mode, bio, 'Bio', classes, onInputClick('bio', setEmployee))}
      { admin && mode == Mode.Edit && <div>
        <FormControlLabel
          control={<Checkbox checked={isAdmin} onChange={onInputClick('isAdmin', setEmployee)} name='isAdmin' />}
          label='Admin'
        />
        <Button
          className={classes.button}
          color='primary'
          variant='contained'
          fullWidth
          onClick={onButtonSave(employee, onSaveURL, method, history, appControls)}
          >
          Save
        </Button>
        </div>}
      </Grid>
      { admin && <Grid item xs={12}>
        <Typography className={classes.title} component='h1' variant='h5'>
          {`${name}'s reviews`}
        </Typography>
        {renderOwnedReviews(reviews, classes, () => {})}
      </Grid> }
      <Grid item xs={12}>
        <Typography className={classes.title} component='h1' variant='h5'>
          {`Reviews assigned to ${name}`}
        </Typography>
        {renderAssignedReviews(assignedReviews, classes, () => {})}
      </Grid>
    </Grid>
    </>
  )
}

function getURLAndMethod(id) {
  const onSaveURL = id === 'null'
    ? '/api/employee/new'
    : `/api/employee/${id}`;
  
  const method = id === 'null'
    ? 'POST'
    : 'PUT'

  return [ onSaveURL, method ];
}

function renderOwnedReviews(reviews, classes, callback) {
  const listItems = reviews.map(review => {
    const { reviewedBy, id } = review;

    return (
      <Paper className={classes.listItem} key={`ownedReview-${id}`}>
        <ListItem
          component={Link}
          to='/'
          onClick={callback}
        >
          <ListItemText primary={reviewedBy} />
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

function renderAssignedReviews(assignedReviews, classes, callback) {
  const listItems = assignedReviews.map(review => {
    const { reviewedBy, id } = review;

    return (
      <Paper className={classes.listItem} key={`ownedReview-${id}`}>
        <ListItem
          component={Link}
          to='/'
          onClick={callback}
        >
          <ListItemText primary={reviewedBy} />
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

function renderTextField(
  mode: Mode,
  value,
  label,
  classes,
  onChange = (e) => console.log(e.target.value),
) {
  const isEdit = Boolean(mode == Mode.Edit);

  return (
    <>
    <InputLabel>{label}</InputLabel>
    <Input
      className={classes.input}
      multiline={true}
      onChange={onChange}
      readOnly={!isEdit}
      value={value}
      required={isEdit}
      fullWidth
      name={label}
      type={label}
      id={label}
    />
    </>
  );
}

function onInputClick(stateKey, setState) {
  return event => {
    let value;

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }

    setState(prevState => {
      return {
        ...prevState,
        [stateKey]: value,
      }
    })
  }
}

function onButtonSave(state, URL, method, history, appControls) {
  return async event => {
    event.preventDefault();
    delete state.assignedReviews;

    const body = JSON.stringify({ employee: state });

    const response = await fetch(URL, {
      method: method,
      body,
      headers: {
        'content-type': 'application/json'
      }
    });

    const json = await response.json();

    history.push('/admin');
    appControls.showNavBackButton(false);
    appControls.rehydrateAPI();

    console.log(`Form response: ${JSON.stringify(json)}`);
  }
}