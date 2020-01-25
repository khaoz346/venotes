"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = "\n    extend type Query {\n        user: User\n    }\n    type User {\n        id: Int!\n        email: String!\n    }\n";
exports.resolvers = {
    Query: {
        user: function () { return ({ id: 1, email: 'victor@gmail.com' }); }
    }
};
