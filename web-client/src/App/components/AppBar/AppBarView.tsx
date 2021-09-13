import React, { ChangeEvent, FC } from 'react';
import {
  AppBar,
  Theme,
  Toolbar,
  Typography,
  Switch,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { DrawerListItem } from './types';
import { LinkRoute } from '../../../components/LinkRoute';

type Props = {
  title: string;
  version: string;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  drawerListItems: DrawerListItem[];
};

export const AppBarView: FC<Props> = ({
  title,
  darkMode,
  setDarkMode,
  openDrawer,
  setOpenDrawer,
  drawerListItems,
  version,
}) => {
  const classes = useStyles();
  const handleSetDarkMode = (value: ChangeEvent<HTMLInputElement>) => {
    setDarkMode(value.target.checked);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={4} className={classes.appbar}>
        <Toolbar>
          <IconButton
            onClick={() => setOpenDrawer(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
          <Switch name="checkedA" checked={darkMode} onChange={handleSetDarkMode} />
        </Toolbar>
        <Drawer anchor={'left'} open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <List className={classes.list}>
            <ListItem>
              <ListItemText secondary={version}>
                <Typography variant="h5" color={'secondary'}>
                  {title}
                </Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            {drawerListItems.map(listItem => (
              <LinkRoute
                to={listItem.routeName}
                key={listItem.name}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItem>
                  <ListItemIcon>{listItem.icon}</ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6" color={'primary'}>
                      {listItem.name}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </LinkRoute>
            ))}
          </List>
        </Drawer>
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 300,
    height: '100%',
    backgroundColor: `${theme.palette.background.default}`,
  },
  appbar: {
    height: 70,
  },
}));
