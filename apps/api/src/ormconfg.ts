import 'reflect-metadata';
import { createConnection } from 'typeorm';
import entities from './entity';

const config = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "paypay",
  "database": "paypay",
  "synchronize": true,
  "logging": true,
  "entities": entities,
  "migrations": [
    "./migration/**/*.ts"
  ],
  "subscribers": [
    "./subscriber/**/*.ts"
  ],
  "cli": {
    "migrationsDir": "migration"
  }
};

function getDBConnector(config): Function {
  return () => {
    return createConnection(config);
  };
}

/**
 * Returns a Promise that if resolved returns
 * a connection to the configured mysql database
 * or an error that can be destructured from the
 * returned array.
 * 
 * i.g. const [connection, error] = dbConnector()
 */
export const dbConnector: Function = getDBConnector(config);