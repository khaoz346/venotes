"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
var merge = require('lodash').merge;
var _a = require('./user'), User = _a.typeDef, UserResolvers = _a.resolvers;
var Query = "\n    type Query {\n        _empty: String\n    }\n\n    type Mutation {\n        _empty: String\n    }";
exports.schema = makeExecutableSchema({
    typeDefs: [Query, User],
    resolvers: merge(UserResolvers)
});
