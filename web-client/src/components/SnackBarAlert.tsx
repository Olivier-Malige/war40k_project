import React, { ReactElement, FC } from 'react';

import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

type Props = {
  open: boolean;
  handleClose: () => void;
  severity: 'success' | 'info' | 'error' | 'warning';
  children: ReactElement;
};

export const SnackBarAlert: FC<Props> = ({ open, handleClose, severity, children }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert color={severity} onClose={handleClose} severity={severity}>
        {children}
      </Alert>
    </Snackbar>
  );
};
