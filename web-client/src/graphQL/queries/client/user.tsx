import { gql } from '@apollo/client';

export const USER_AUTH = gql`
  query userAuth {
    userAuth @client
  }
`;

export const USER_ROLE = gql`
  query userRoe {
    userRole @client
  }
`;
