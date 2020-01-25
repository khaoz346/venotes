interface User {
  id: number;
  email: string;
}

interface Users {
  [key: number]: User;
}

const users: Users = {
  1: {
    id: 1,
    email: 'victor@gmail.com'
  },
  2: {
    id: 2,
    email: 'carol@gmail.com'
  }
};

export const typeDef = `
    extend type Query {
        getUserById(userId: Int!): User
    }
    type User {
        id: Int!
        email: String!
    }
`;

export const resolvers = {
  Query: {
    getUserById: (parent: undefined, { userId }: any): User => users[userId]
  }
};
