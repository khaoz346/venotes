const express = require('express');
const { makeGraphqlHTTP } = require('./graphql');
const { Model } = require('objection');
const knex = require('./db/knex/knex');

//Bind Models to a knex instance
Model.knex(knex);

const app = express();
app.use('/graphql', makeGraphqlHTTP());
app.listen(5050);
console.log('Running a GraphQL API server at http://localhost:5050/graphql');
