"use strict";
var express = require('express');
var graphqlHTTP = require('express-graphql');
var buildSchema = require('graphql').buildSchema;
// Construct a schema, using GraphQL schema language
var schema = buildSchema("\n  type Query {\n    hello: String\n    goodbye: String\n    test: Character\n  }\n\n  type Character {\n    name: String!\n    age: Int!\n  }\n");
var character = {
    name: 'Victor Wu',
    age: 24
};
// The root provides a resolver function for each API endpoint
var root = {
    hello: function () {
        return 'Hello world!';
    },
    goodbye: function () {
        return 'Goodbye world!';
    },
    test: function () {
        return character;
    }
};
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(5050);
console.log('Running a GraphQL API server at http://localhost:5050/graphql');
