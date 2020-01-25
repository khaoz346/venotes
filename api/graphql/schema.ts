const { makeExecutableSchema } = require('graphql-tools');

const { typeDef: User } = require('./user');

const Query = `
    type Query {
        _empty: String
    }`;

export const schema = makeExecutableSchema({
  typeDefs: [Query, User]
});
