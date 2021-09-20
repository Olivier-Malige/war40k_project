import React, { useState } from 'react';
import { Home, ImageAspectRatio } from '@mui/icons-material';

import { routeNames } from '../../../navigation/CONSTANTS';
import { AppBarView } from './AppBarView';
import { DrawerListItem } from './types';

type Props = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const drawerListItems: DrawerListItem[] = [
  {
    name: 'Home',
    routeName: routeNames.ROOT,
    icon: <Home />,
  },
  {
    name: 'Units editor',
    routeName: routeNames.UNITS_EDITOR,
    icon: <ImageAspectRatio />,
  },
];

export const AppBarContainer: React.FC<Props> = ({ darkMode, setDarkMode }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <AppBarView
      title={'Warhammer API builder'}
      version={'Alpha dev'}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      openDrawer={openDrawer}
      setOpenDrawer={setOpenDrawer}
      drawerListItems={drawerListItems}
    />
  );
};
