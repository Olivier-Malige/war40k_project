import React, { FC } from 'react';
import { Container, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { War40kUnitsTable } from './components/UnitsTables';
import { SnackBarAlert } from '../../components/SnackBarAlert';

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
  const classes = useStyles();
  return (
    <Container maxWidth={'xl'} className={classes.root}>
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
    </Container>
  );
};
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'calc(100vh - 70px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
}));
