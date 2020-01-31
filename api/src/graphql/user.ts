import User from '../database/models/user';

// interface Users {
//   [key: number]: User;
// }

export const typeDef = `
    extend type Query {
        getUserById(userId: Int!): User
    }
    type User {
        id: Int!
        email: String!
    }
`;

//TODO: Find out types for graphql resolver params

export const resolvers = {
  Query: {
    getUserById: async (_parent: any, { userId }: any): Promise<User> =>
      User.getUserById(userId)
  }
};
