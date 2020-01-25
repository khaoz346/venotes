export const typeDef = `
    extend type Query {
        user: User
    }
    type User {
        id: Int!
        email: String!
    }
`;

export const resolvers = {
  Query: {
    user: () => ({ id: 1, email: 'victor@gmail.com' })
  }
};
