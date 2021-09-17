import React, { ReactElement, FC } from 'react';

import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type Props = {
  open: boolean;
  handleClose: () => void;
  severity: 'success' | 'info' | 'error' | 'warning';
  children: ReactElement;
};

export const SnackBarAlert: FC<Props> = ({ open, handleClose, severity, children }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert color={severity} onClose={handleClose} severity={severity}>
        {children}
      </Alert>
    </Snackbar>
  );
};
