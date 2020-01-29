"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlHTTP = require('express-graphql');
const { schema } = require('./schema');
exports.makeGraphqlHTTP = () => {
    return graphqlHTTP({
        schema: schema,
        graphiql: true
    });
};
