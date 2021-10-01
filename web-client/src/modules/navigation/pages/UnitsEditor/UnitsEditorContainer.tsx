import React from 'react';
import { UnitsEditorView } from 'src/modules/navigation/pages/UnitsEditor/UnitsEditorView';
import { openSuccessMessage, openErrorMessage } from 'src/graphQL/cache';
import { gql, useQuery } from '@apollo/client';

export const OPEN_SUCCESS_MESSAGE = gql`
  query openSuccessMessage {
    openSuccessMessage
  }
`;

export const OPEN_ERROR_MESSAGE = gql`
  query openErrorMessage {
    openErrorMessage
  }
`;
export const UnitsEditorContainer: React.FC = () => {
  const { data: successData } = useQuery(OPEN_SUCCESS_MESSAGE);
  const { data: errorData } = useQuery(OPEN_ERROR_MESSAGE);
  return (
    <UnitsEditorView
      openSuccessMessage={successData.openSuccessMessage}
      openErrorMessage={errorData.openSuccessMessage}
      handleCloseErrorMessage={() => openErrorMessage(false)}
      handleCloseSuccessMessage={() => openSuccessMessage(false)}
    />
  );
};