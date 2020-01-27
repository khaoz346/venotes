"use strict";
var express = require('express');
var makeGraphqlHTTP = require('./graphql').makeGraphqlHTTP;
var setupKnex = require('./database/knex').setupKnex;
setupKnex();
var app = express();
app.use('/graphql', makeGraphqlHTTP());
app.listen(5050);
console.log('Running a GraphQL API server at http://localhost:5050/graphql');
