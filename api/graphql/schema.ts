const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

const { typeDef: User, resolvers: UserResolvers } = require('./user');

const Query = `
    type Query {
        _empty: String
    }`;

export const schema = makeExecutableSchema({
  typeDefs: [Query, User],
  resolvers: merge(UserResolvers)
});
