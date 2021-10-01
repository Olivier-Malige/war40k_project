import { gql } from 'apollo-server';
import { shield } from 'graphql-shield';
import { listUsers, updateUser } from '../../firebase/users';

export const typeDefs = gql`
  enum Roles {
    admin
    contributor
    tester
  }

  type User {
    displayName: String
    id: ID!
    role: Roles!
    email: String!
    disabled: String!
  }

  input UpdateUserInput {
    id: ID!
    displayName: String
    role: Roles
    email: String!
  }

  type Query {
    users: [User]
  }
  type Mutation {
    updateUser(input: UpdateUserInput): User
  }
`;

export const resolvers = {
  Query: {
    users: async () => {
      const result = await listUsers();
      return result.users.map(user => ({
        displayName: user.displayName || '',
        email: user.email,
        disabled: user.disabled,
        role: '',
        id: user.uid,
      }));
    },
  },
  Mutation: {
    updateUser: async (_parent, { input }) => {
      const result = await updateUser(input.id, {
        email: input.email,
        displayName: input.displayName,
      });
      return {
        displayName: result.displayName || '',
        email: result.email,
        disabled: result.disabled,
        role: '',
        id: result.uid,
      };
    },
  },
};
export const permission = shield({});
