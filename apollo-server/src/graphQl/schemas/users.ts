import { gql } from 'apollo-server';
import { createUser, listUsers, deleteUsers, updateUser, getUser } from '../../firebase/users';
import { isAdmin } from '../rules';
import { CreateUserInput, UpdateUserInput, User } from '../../types';
import { IResolvers } from 'graphql-middleware/dist/types';
import { auth } from 'firebase-admin';

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
    disabled: Boolean!
    creationDate: Date!
    lastSignInDate: Date!
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

const userRecordToUser = (userRecord: auth.UserRecord): User => {
  return {
    displayName: userRecord.displayName || '',
    email: userRecord.email,
    disabled: userRecord.disabled,
    role: userRecord.customClaims?.role,
    id: userRecord.uid,
    creationDate: userRecord.metadata.creationTime,
    lastSignInDate: userRecord.metadata.lastSignInTime,
  };
};

export const resolvers: IResolvers = {
  Query: {
    users: async () => {
      const result = await listUsers();
      return result.users.map(user => userRecordToUser(user));
    },
    user: async (_parent, { id }: { id: string }): Promise<User> => {
      const user = await getUser(id);
      return userRecordToUser(user);
    },
  },
  Mutation: {
    updateUser: async (
      _parent,
      { id, input }: { input: UpdateUserInput; id: string },
    ): Promise<User> => {
      const user = await updateUser(id, {
        email: input.email,
        displayName: input.displayName,
        role: input.role,
        disabled: input.disabled,
        password: input.password,
      });
      return userRecordToUser(user);
    },
    createUser: async (_parent, { input }: { input: CreateUserInput }): Promise<User> => {
      const user = await createUser({
        email: input.email,
        displayName: input.displayName,
        password: input.password,
        role: input.role,
        disabled: input.disabled,
      });

      return userRecordToUser(user);
    },
    deleteUsers: async (_parent, { id }: { id: string[] }): Promise<boolean> => {
      return await deleteUsers(id);
    },
  },
};

export const permissions = {
  Query: {
    users: isAdmin,
    user: isAdmin,
  },
  Mutation: {
    updateUser: isAdmin,
    createUser: isAdmin,
    deleteUsers: isAdmin,
  },
};
