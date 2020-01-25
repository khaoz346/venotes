"use strict";
var express = require('express');
var makeGraphqlHTTP = require('./graphql').makeGraphqlHTTP;
var Model = require('objection').Model;
var knex = require('./db/knex/knex');
//Bind Models to a knex instance
Model.knex(knex);
var app = express();
app.use('/graphql', makeGraphqlHTTP());
app.listen(5050);
console.log('Running a GraphQL API server at http://localhost:5050/graphql');
