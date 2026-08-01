import { KnexPgAdapter } from "@kottster/server";
import knex from "knex";
import process from "process";

/**
 * Learn more at https://knexjs.org/guide/#configuration-options
 */
const client = knex({
  client: "pg",
  connection: {
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  searchPath: ["public"],
});

export default new KnexPgAdapter(client);
