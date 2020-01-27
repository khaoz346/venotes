const express = require('express');
const { makeGraphqlHTTP } = require('./graphql');
const { setupKnex } = require('./database/knex');

setupKnex();

const app = express();
app.use('/graphql', makeGraphqlHTTP());
app.listen(5050);
console.log('Running a GraphQL API server at http://localhost:5050/graphql');
