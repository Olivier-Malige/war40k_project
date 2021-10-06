import React, { useState } from 'react';
import { Group, Home, ImageAspectRatio } from '@mui/icons-material';

import { routeNames } from 'src/modules/navigation/CONSTANTS';
import { AppBarView } from './AppBarView';
import { DrawerListItem } from './types';
import { useQuery } from '@apollo/client';
import { USER_ROLE } from 'src/graphQL/queries/client/user';
import { Roles } from 'src/modules/authentication/types';
import { useAuth } from 'src/modules/authentication/hooks/useAuth';

type Props = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  isUserAuth: boolean;
};

export const AppBarContainer: React.FC<Props> = ({ darkMode, setDarkMode, isUserAuth }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data } = useQuery(USER_ROLE);
  const { signOut } = useAuth();
  const drawerListItems: DrawerListItem[] = [
    {
      name: 'Home',
      routeName: routeNames.HOME,
      icon: <Home sx={{ color: theme => theme.palette.secondary.main }} />,
      show: true,
    },
    {
      name: 'Units editor',
      routeName: routeNames.UNITS_EDITOR,
      icon: <ImageAspectRatio sx={{ color: theme => theme.palette.secondary.main }} />,
      show: data?.userRole === Roles.CONTRIBUTOR || data?.userRole === Roles.ADMIN,
    },
    {
      name: 'Users',
      routeName: routeNames.USERS,
      icon: <Group sx={{ color: theme => theme.palette.secondary.main }} />,
      show: data?.userRole === Roles.ADMIN,
    },
  ];
  return (
    <AppBarView
      title={'Warhammer API builder'}
      version={'Alpha dev'}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      openDrawer={openDrawer}
      setOpenDrawer={setOpenDrawer}
      drawerListItems={drawerListItems}
      isUserAuth={isUserAuth}
      onSignOut={signOut}
    />
  );
};
