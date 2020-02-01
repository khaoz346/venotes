"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../database/models/user"));
exports.typeDef = `
    extend type Query {
        getUserById(userId: Int!): User
        getUserByEmail(userEmail: String!): User
    }

    extend type Mutation {
      createUser(input: CreateUserInput): User
    }

    enum Role {
      member
      guest
    }

    input CreateUserInput {
      email: String!
      password: String!
      firstName: String
      lastName: String
      role: Role
    }

    type User {
        id: ID!
        email: String
        password: String
        firstName: String
        lastName: String
        role: Role!
        createdAt: String
        updatedAt: String
    }

`;
exports.resolvers = {
    Query: {
        getUserById: (_parent, { userId }) => __awaiter(void 0, void 0, void 0, function* () { return user_1.default.getUserById(userId); }),
        getUserByEmail: (_parent, { userEmail }) => __awaiter(void 0, void 0, void 0, function* () { return user_1.default.getUserByEmail(userEmail); })
    },
    Mutation: {
        createUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () { return user_1.default.createUser(input); })
    }
};
