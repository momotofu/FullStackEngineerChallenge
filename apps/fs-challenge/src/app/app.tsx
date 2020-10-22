// Package imports
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CircularProgress } from '@material-ui/core';

// Local imports
import { Page } from './components/page';
import { Login } from './pages/login';
import { Admin } from './pages/admin';
import { Employee } from './pages/employee';

/**
 * Sends setRehydrateAPI to children so components can
 * be hydrated with state after the user has logged in.
 */
export const APIContext = React.createContext({});

export const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);
  const [ payload, setPayload ] = useState({});
  const [ employeeId, setEmployeeId ] = useState({});
  const [ rehydrateAPI, setRehydrateAPI ] = useState(false);
  const [ isApiFetching, setIsApiFetching ] = useState(true);
  const [ pageTitle, setPageTitle ] = useState('');
  const [ showNav, setShowNav ] = useState(false);
  const [ showNavBackButton, setShowNavBackButton ] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }, [isLoggedIn])

  useEffect(() => {
    setIsApiFetching(true);

    /**
     * The main api request that hydrates the app with the
     * employee[object], employees[array], and reviews[array] data.
     * Data recieved depends on whether the employee has admin
     * privliges or not.
     */
    fetch('/api')
      .then(r => r.json())
      .then(res => {
        const {
          employee,
          isAdmin,
          employees,
          employeeId,
          error,
        } = res;

        if (error) {
          console.log(`error: ${error}`);
          setPayload({});
          setIsAdmin(false);
          setIsLoggedIn(false);
          setIsApiFetching(false);
          return;
        }

        // Check if user has logged in and update related state
          if (isAdmin) {
            setPayload({
              admin: employee,
              employees,
            });

            setIsAdmin(true);
          } else {
            setEmployeeId(employeeId)

            setIsAdmin(false);
          }

          setIsLoggedIn(true);

        setIsApiFetching(false);
      })

    console.log('api fetched');
  }, [rehydrateAPI]);

  // console.log(isLoggedIn);

  const appControls = {
    rehydrateAPI: () => setRehydrateAPI(prevState => !prevState),
    logoutUser: () => setIsLoggedIn(false),
    setPageTitle: setPageTitle,
    showNavBackButton: setShowNavBackButton,
  }

  return (
    <Router>
      <APIContext.Provider value={appControls}>
        <Page showNav={showNav} title={pageTitle} showBackButton={showNavBackButton}>
          { isApiFetching
              ? <CircularProgress />
              : <Switch>
                  <ProtectedRoute exact path='/' isLoggedIn={isLoggedIn}>
                    { isAdmin
                        ? <Redirect to='/admin' />
                        : <Redirect to={`/employee/${employeeId}/view`} />
                    }
                  </ProtectedRoute>
                  <Route path='/login'>
                    { isLoggedIn
                      ? <Redirect to='/'/>
                      : <Login />
                    }
                  </Route>
                  <ProtectedRoute path='/admin' isLoggedIn={isLoggedIn}>
                    <Admin {...payload} />
                  </ProtectedRoute>
                  <ProtectedRoute path='/employee/:id/:state' isLoggedIn={isLoggedIn}>
                    <Employee {...payload} />
                  </ProtectedRoute>
                </Switch>
          }
        </Page>
      </APIContext.Provider>
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