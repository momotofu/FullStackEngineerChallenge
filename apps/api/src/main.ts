import * as express from 'express';
import "reflect-metadata";
import { Message } from '@pay-pay/api-interfaces';

import { dbConnector } from './ormconfg';

dbConnector().then(conn => {
  const admin = {
    name: 'Christopher',
    email: 'test@testmail.com',
    bio: 'PayPay candidate who love\s unagi-don',
    photoURL: 'https://avatars3.githubusercontent.com/u/5377298?s=460&u=387ca2b2f800c4bca990b8dfc1e48acc9055d187&v=4',
    passwordHash: '',
    isAdmin: true,
    reviews: [],
  };

  const emp1 = {
    name: 'John',
    bio: 'A delightful jazz musician.',
    email: 'test@testmail.com',
    photoURL: '',
    passwordHash: '',
    isAdmin: false,
    reviews: [],
  };

  conn.getRepository('Employee').save([admin, emp1])
    .then((savedEmp) => {
      console.log('savedEmp: ', savedEmp);
    })
    .catch(err => console.log('error: ', err));
})
.catch(err => console.log('error: ', err));

// console.log('connection: ', connection, ' conErr: ', connErr);

const app = express();

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
