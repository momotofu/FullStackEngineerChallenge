// Package imports
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Local imports
import { Login } from './pages/login';


export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAdmin = true;

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then((res) => console.log(`response: ${res}`));
  }, []);

  console.log('isLoggedIn: ', isLoggedIn);

  return (
    <Router>
      <div>
        <div style={{ textAlign: 'center' }}>
          <Switch>
            <ProtectedRoute exact path='/' isLoggedIn={isLoggedIn}>
              { isAdmin
                  ? <Redirect to='/admin' />
                  : <Redirect to='employee' />
              }
            </ProtectedRoute>
            <Route path='/login'>
              <Login />
            </Route>
            <ProtectedRoute path='/admin' isLoggedIn={isLoggedIn}>
              <div>Admin page</div>
            </ProtectedRoute>
            <ProtectedRoute path='/employee' isLoggedIn={isLoggedIn}>
              <div>Employee page</div>
            </ProtectedRoute>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

/**
 * A Route wrapper that redirects users to the login page
 * if they are not logged in.
 */
function ProtectedRoute({ isLoggedIn, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const { location } = props;
        const redirectProps = {
          pathname: '/login',
          state: { from: location }
        };

        return isLoggedIn
          ? children 
          : <Redirect to={redirectProps} />
      }}
    />
  );
}

export default App;