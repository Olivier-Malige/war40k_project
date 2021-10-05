import { gql } from 'apollo-server';
import { not, or, shield } from 'graphql-shield';
import { createUser, listUsers, deleteUsers, updateUser, getUser } from '../../firebase/users';
import { isAuthenticated } from '../permissions';
import { CreateUserInput, UpdateUserInput, User } from '../../types';
import { IResolvers } from 'graphql-middleware/dist/types';

export const typeDefs = gql`
  enum Roles {
    admin
    contributor
    tester
  }

  type User {
    displayName: String
    id: ID!
    role: Roles
    email: String!
    disabled: Boolean!
  }

  input UpdateUserInput {
    displayName: String
    role: Roles
    email: String
    password: String
    disabled: Boolean
  }

  input CreateUserInput {
    displayName: String
    email: String!
    role: Roles!
    password: String!
    disabled: Boolean!
  }

  type Query {
    users: [User]
    user(id: ID): User
  }
  type Mutation {
    updateUser(id: ID!, input: UpdateUserInput): User
    createUser(input: CreateUserInput): User
    deleteUsers(id: [String!]!): Boolean
  }
`;

export const resolvers: IResolvers = {
  Query: {
    users: async () => {
      const result = await listUsers();
      return result.users.map(user => ({
        displayName: user.displayName || '',
        email: user.email,
        disabled: user.disabled,
        role: user.customClaims?.role,
        id: user.uid,
      }));
    },
    user: async (_parent, { id }: { id: string }) => {
      const user = await getUser(id);
      return {
        displayName: user.displayName || '',
        email: user.email,
        disabled: user.disabled,
        role: user.customClaims?.role,
        id: user.uid,
      };
    },
  },
  Mutation: {
    updateUser: async (_parent, { id, input }: { input: UpdateUserInput; id: string }) => {
      const user = await updateUser({
        id: id,
        email: input.email,
        displayName: input.displayName,
        role: input.role,
        disabled: input.disabled,
      });
      return {
        displayName: user.displayName || '',
        email: user.email,
        disabled: user.disabled,
        role: user.customClaims?.role,
        id: user.uid,
      };
    },
    createUser: async (_parent, { input }: { input: CreateUserInput }): Promise<User> => {
      const user = await createUser({
        email: input.email,
        displayName: input.displayName,
        password: input.password,
        role: input.role,
      });

      return {
        displayName: user.displayName || '',
        email: user.email,
        disabled: user.disabled,
        role: user.customClaims.role,
        id: user.uid,
      };
    },
    deleteUsers: async (_parent, { id }: { id: string[] }): Promise<boolean> => {
      return await deleteUsers(id);
    },
  },
};
export const permission = shield({
  Query: {
    users: or(isAuthenticated, not(isAuthenticated)),
  },
  Mutation: {
    updateUser: or(isAuthenticated, not(isAuthenticated)),
    createUser: or(isAuthenticated, not(isAuthenticated)),
    deleteUsers: or(isAuthenticated, not(isAuthenticated)),
  },
});
