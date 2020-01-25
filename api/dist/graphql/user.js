"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users = {
    1: {
        id: 1,
        email: 'victor@gmail.com'
    },
    2: {
        id: 2,
        email: 'carol@gmail.com'
    }
};
exports.typeDef = "\n    extend type Query {\n        getUserById(userId: Int!): User\n    }\n    type User {\n        id: Int!\n        email: String!\n    }\n";
exports.resolvers = {
    Query: {
        getUserById: function (parent, _a) {
            var userId = _a.userId;
            return users[userId];
        }
    }
};
