import { gql } from '@apollo/client';

export const typeDefs = gql`
  extend type Query {
    openSuccessMessage: Boolean!
    openErrorMessage: Boolean!
    userAuth: Boolean!
  }
`;
