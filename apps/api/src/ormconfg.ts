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


/**
 * Function that configuress a TypoORM database connecter.
 * It returns a function that will return the configured 
 * connector as a Promise. If seeds are passed into the 
 * returned function, seed data will be generated (if it hasn't
 * been already). 
 * 
 * Seeds shape is [ seedName, [ seedData ] ]
 * 
 * @param config 
 * @param seeds 
 * 
 */
function getDBConnector(config) {
  return async seeds => {
    if (seeds) {
      const conn = await createConnection(config);

      seeds.forEach(async seed => {
        const [ seedName, seedData ] = seed;
        const repo = conn.getRepository(seedName);

        await seedData.forEach(async data => {
          const entity = await repo.create(data);
          const foundEntity = await repo.findOne({ email: entity.email });

          if(foundEntity) {
            // Database has already been seeded
            return;
          }

          const result = await repo.save(entity);
          console.log(`Seeded: ${Object.keys(result)} into database`);
        });
      });
     

      return new Promise(resolve => resolve(conn));
    }

    return createConnection(config);
  };
}

export const dbConnector: Function = getDBConnector(config);