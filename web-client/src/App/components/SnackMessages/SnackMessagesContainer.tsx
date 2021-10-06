import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import { SnackMessagesView } from './SnackMessagesView';
import { openSuccessMessage, openErrorMessage } from 'src/graphQL/cache';

import { OPEN_ERROR_MESSAGE, OPEN_SUCCESS_MESSAGE } from 'src/graphQL/queries/client/messages';

export function SnackMessagesContainer(): ReactElement {
  const { data: successData } = useQuery(OPEN_SUCCESS_MESSAGE);
  const { data: errorData } = useQuery(OPEN_ERROR_MESSAGE);

  return (
    <SnackMessagesView
      openSuccess={successData.openSuccessMessage}
      openError={errorData.openErrorMessage}
      handleCloseError={() => openErrorMessage(false)}
      handleCloseSuccess={() => openSuccessMessage(false)}
    />
  );
}
