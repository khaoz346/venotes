"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = {
    1: {
        id: 1,
        email: 'victor@gmail.com'
    },
    2: {
        id: 2,
        email: 'carol@gmail.com'
    }
};
exports.typeDef = `
    extend type Query {
        getUserById(userId: Int!): User
    }
    type User {
        id: Int!
        email: String!
    }
`;
exports.resolvers = {
    Query: {
        getUserById: (_parent, { userId }) => users[userId]
    }
};
