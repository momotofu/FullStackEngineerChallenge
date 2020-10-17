// Package imports
import * as express from 'express';
import "reflect-metadata";
import session from 'express-session';

// Local imports
import { dbConnector } from './ormconfg';
import { isLoggedIn } from './app/utils';
import { addLoginRoute } from './app/routes/login';

dbConnector().then(conn => {
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
    sessConfig.cookie.secure = true // serve secure cookies
  }

  // Configure express app
  app.use(session(sessConfig));
  app.use(isLoggedIn);

  // Add routes
  addLoginRoute(app, apiPrefix, employeeRepository);

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

