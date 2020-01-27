const config = require('./knexConfig');
const knex = require('knex')(config);
const { Model } = require('objection');

export const setupKnex = (): void => {
  Model.knex(knex);
  knex.migrate.latest();
};
