import React, { FC } from 'react';
import { Container } from '@mui/material';
import { War40kUnitsTable } from './components/UnitsTables';
import { SnackBarAlert } from '../../components/SnackBarAlert';
import { Box } from '@mui/system';

type Props = {
  openSuccessMessage: boolean;
  openErrorMessage: boolean;
  handleCloseSuccessMessage: () => void;
  handleCloseErrorMessage: () => void;
};
export const UnitsEditorView: FC<Props> = ({
  openSuccessMessage,
  openErrorMessage,
  handleCloseSuccessMessage,
  handleCloseErrorMessage,
}) => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 70px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <War40kUnitsTable />
      <SnackBarAlert
        open={openSuccessMessage}
        handleClose={handleCloseSuccessMessage}
        severity={'success'}
      >
        <span>The operation was well done </span>
      </SnackBarAlert>
      <SnackBarAlert
        open={openErrorMessage}
        handleClose={handleCloseErrorMessage}
        severity={'error'}
      >
        <span>An error has occurred </span>
      </SnackBarAlert>
    </Box>
  );
};
