import { gql } from 'apollo-server';
import { not, or, shield } from 'graphql-shield';
import { createUser, listUsers, removeUser, updateUser } from '../../firebase/users';
import { isAuthenticated } from '../permissions';
import { User, UserInput } from '../../interfaces';
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
    role: Roles!
    email: String!
    disabled: String!
  }

  input UpdateUserInput {
    id: ID!
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
  }

  type Query {
    users: [User]
  }
  type Mutation {
    updateUser(input: UpdateUserInput): User
    createUser(input: CreateUserInput): User
    removeUser(id: ID): Boolean
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
  },
  Mutation: {
    updateUser: async (_parent, { input }: { input: UserInput }) => {
      const user = await updateUser(input.id, {
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
    createUser: async (_parent, { input }: { input: UserInput }): Promise<User> => {
      const result = await createUser({
        email: input.email,
        displayName: input.displayName,
        password: input.password,
        role: input.role,
      });

      return {
        displayName: result.displayName || '',
        email: result.email,
        disabled: result.disabled,
        role: result.customClaims.role,
        id: result.uid,
      };
    },
    removeUser: async (_parent, { id }: { id: string }): Promise<boolean> => {
      return await removeUser(id);
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
    removeUser: or(isAuthenticated, not(isAuthenticated)),
  },
});
