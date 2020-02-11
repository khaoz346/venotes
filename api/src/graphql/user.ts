import User from '../database/models/user';

// interface Users {
//   [key: number]: User;
// }

export const typeDef = `
    extend type Query {
        getUserById(userId: Int!): User
        getUserByEmail(userEmail: String!): User
    }

    extend type Mutation {
      createUser(input: CreateUserInput): User
      loginUser(email: String!, password: String!): String
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

//TODO: Find out types for graphql resolver params

export const resolvers = {
  Query: {
    getUserById: async (_parent: any, { userId }: any): Promise<User> =>
      User.getUserById(userId),
    getUserByEmail: async (_parent: any, { userEmail }: any): Promise<User> =>
      User.getUserByEmail(userEmail)
  },
  Mutation: {
    createUser: async (_: any, { input }: any): Promise<User> => {
      const createdUser = await User.createUser(input);
      return createdUser;
    },
    loginUser: async (
      _parent: any,
      { email, password }: any
    ): Promise<string> => User.login(email, password)
  }
};
