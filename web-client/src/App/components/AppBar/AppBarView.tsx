import React, { ChangeEvent, FC } from 'react';
import { AppBar, Theme, Toolbar, Typography, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

type Props = {
  title: string;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

export const AppBarView: FC<Props> = ({ title, darkMode, setDarkMode }) => {
  const classes = useStyles();
  const handleSetDarkMode = (value: ChangeEvent<HTMLInputElement>) => {
    setDarkMode(value.target.checked);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={4} className={classes.appbar}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
          <Switch name="checkedA" checked={darkMode} onChange={handleSetDarkMode} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    height: 70,
  },
}));
