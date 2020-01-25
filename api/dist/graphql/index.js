"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphqlHTTP = require('express-graphql');
var schema = require('./schema').schema;
exports.makeGraphqlHTTP = function () {
    return graphqlHTTP({
        schema: schema,
        graphiql: true
    });
};
