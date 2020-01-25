const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    goodbye: String
    test: Character
  }

  type Character {
    name: String!
    age: Int!
  }
`);

const character: object = {
  name: 'Victor Wu',
  age: 24
};

// The root provides a resolver function for each API endpoint
const root = {
  hello: (): string => {
    return 'Hello world!';
  },
  goodbye: (): string => {
    return 'Goodbye world!';
  },
  test: (): object => {
    return character;
  }
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(5050);
console.log('Running a GraphQL API server at http://localhost:5050/graphql');
