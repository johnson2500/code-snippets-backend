// run the following command to install:
// npm install objection knex sqlite3

const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
  client: 'pg',
  connection: {
    connectionString: process.env.POSTGRES_URI,
    ssl: { rejectUnauthorized: false },
  },
});

// Give the knex instance to objection.
Model.knex(knex);
