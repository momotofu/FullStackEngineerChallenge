// Package imports
import * as express from 'express';
import "reflect-metadata";
import session from 'express-session';
import logger from 'morgan';

// Local imports
import { dbConnector } from './ormconfg';
import { isLoggedIn } from './app/utils';
import { addLoginRoute } from './app/routes/login';
import { addEmployeeRoute } from './app/routes/employee';
import { addIndexRoute } from './app/routes/';
import { getSeeds } from './seed';

getSeeds().then(seeds => {
  const shouldSeed = process.env.NODE_ENV === 'development';

  dbConnector(shouldSeed ? seeds : false ).then(conn => {
    const employeeRepository = conn.getRepository('Employee');
    const reviewRepository = conn.getRepository('Review');

    const app = express();
    const apiPrefix = '/api';
    const sessConfig = {
      secret: process.env.SESSION_SECRET,
      cookie: { secure: false }
    }
    
    if (process.env.NODE_ENV === 'production') {
      app.set('trust proxy', 1) // trust first proxy
      sessConfig.cookie.secure = true
    }

    // Configure express app
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(session(sessConfig));
    app.use(logger('dev'));
    app.use(isLoggedIn);

    // Add routes to app
    addLoginRoute(app, apiPrefix, employeeRepository);
    addIndexRoute(app, apiPrefix, employeeRepository);
    addEmployeeRoute(app, apiPrefix, employeeRepository, reviewRepository);

    app.get(apiPrefix, (req, res) => {
      res.send({ message: 'Hello World'});
    });

    const port = process.env.port || 3333;
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);
  })
    .catch(err => console.log(`dbConnector failed with error: ${err}`));
});


