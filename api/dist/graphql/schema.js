"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
var User = require('./user').typeDef;
var Query = "\n    type Query {\n        _empty: String\n    }";
exports.schema = makeExecutableSchema({
    typeDefs: [Query, User]
});
