import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      email
      id
      displayName
      role
      disabled
      lastSignInDate
      creationDate
    }
  }
`;

export const DELETE_USERS = gql`
  mutation DeleteUsers($userIds: [String!]!) {
    deleteUsers(id: $userIds)
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      displayName
      role
      disabled
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput) {
    createUser(input: $input) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput, $id: ID!) {
    updateUser(input: $input, id: $id) {
      id
    }
  }
`;
