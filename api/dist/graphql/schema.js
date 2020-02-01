"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');
const { typeDef: User, resolvers: UserResolvers } = require('./user');
const Query = `
    type Query {
        greeting: String
        _empty: String
    }

    type Mutation {
        _empty: String
    }`;
exports.schema = makeExecutableSchema({
    typeDefs: [Query, User],
    resolvers: merge(UserResolvers, { Query: { greeting: () => 'Hello!' } })
});
