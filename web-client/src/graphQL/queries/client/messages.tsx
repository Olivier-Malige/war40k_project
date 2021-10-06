import { gql } from '@apollo/client';

export const OPEN_SUCCESS_MESSAGE = gql`
  query openSuccessMessage {
    openSuccessMessage @client
  }
`;

export const OPEN_ERROR_MESSAGE = gql`
  query openErrorMessage {
    openErrorMessage @client
  }
`;
