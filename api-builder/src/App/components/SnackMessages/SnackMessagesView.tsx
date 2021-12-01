import React, { FC } from 'react';
import { SnackBarAlert } from 'src/shared/components/SnackBarAlert';

type Props = {
  openSuccess: boolean;
  openError: boolean;
  handleCloseSuccess: () => boolean;
  handleCloseError: () => boolean;
};

export const SnackMessagesView: FC<Props> = ({
  openSuccess,
  openError,
  handleCloseError,
  handleCloseSuccess,
}) => {
  return (
    <>
      <SnackBarAlert open={openSuccess} handleClose={handleCloseSuccess} severity={'success'}>
        <span>The operation was well done </span>
      </SnackBarAlert>
      <SnackBarAlert open={openError} handleClose={handleCloseError} severity={'error'}>
        <span>An error has occurred </span>
      </SnackBarAlert>
    </>
  );
};
