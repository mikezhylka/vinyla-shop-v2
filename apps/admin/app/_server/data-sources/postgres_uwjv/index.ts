import { KnexPgAdapter } from '@kottster/server';
import knex from 'knex';

/**
 * Learn more at https://knexjs.org/guide/#configuration-options
 */
const client = knex({
  client: 'pg', 
  connection: {
    connectionString: 'postgresql://neondb_owner:npg_uiK7pwIe4LUP@ep-lucky-pond-alcczoyn-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    ssl: {
      rejectUnauthorized: false
    }
  },
  searchPath: ['public']
});

export default new KnexPgAdapter(client);