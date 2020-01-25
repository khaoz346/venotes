var express = require('./node_modules/express');
var graphqlHTTP = require('express-graphql');
var buildSchema = require('graphql').buildSchema;
// Construct a schema, using GraphQL schema language
var schema = buildSchema("\n  type Query {\n    hello: String\n  }\n");
// The root provides a resolver function for each API endpoint
var root = {
    hello: function () {
        return 'Hello world!';
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
