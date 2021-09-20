import React, { ChangeEvent, FC } from 'react';
import {
  AppBar,
  Box,
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
} from '@mui/material';
import { Menu } from '@mui/icons-material';
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
  const handleSetDarkMode = (value: ChangeEvent<HTMLInputElement>) => {
    setDarkMode(value.target.checked);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        position="static"
        elevation={5}
        sx={{
          height: 70,
        }}
      >
        <Toolbar>
          <IconButton
            sx={{
              marginRight: 2,
            }}
            onClick={() => setOpenDrawer(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
            size="large"
          >
            <Menu />
          </IconButton>
          <Typography
            sx={{
              flexGrow: 1,
            }}
            variant="h5"
          >
            {title}
          </Typography>
          <Switch name="checkedA" checked={darkMode} onChange={handleSetDarkMode} />
        </Toolbar>
        <Drawer anchor={'left'} open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <List
            sx={{
              width: 300,
              height: '100%',
            }}
          >
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
                    <Typography variant="h6" color={'textPrimary'}>
                      {listItem.name}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </LinkRoute>
            ))}
          </List>
        </Drawer>
      </AppBar>
    </Box>
  );
};
