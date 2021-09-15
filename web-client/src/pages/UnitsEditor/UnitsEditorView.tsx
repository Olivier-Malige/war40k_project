import React from 'react';
import { Container, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { War40kUnitsTable } from './components/UnitsTables';

export const UnitsEditorView: React.FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={'xl'} className={classes.root}>
      <War40kUnitsTable />
    </Container>
  );
};
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 20,
    height: 'calc(100vh - 70px)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  },
}));
