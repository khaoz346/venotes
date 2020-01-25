const graphqlHTTP = require('express-graphql');
const { schema } = require('./schema');

export const makeGraphqlHTTP = () => {
  return graphqlHTTP({
    schema: schema,
    graphiql: true
  });
};
