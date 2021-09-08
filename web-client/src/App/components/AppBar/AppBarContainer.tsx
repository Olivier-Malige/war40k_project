import React from 'react';
import { AppBarView } from './AppBarView';
type Props = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};
export const AppBarContainer: React.FC<Props> = ({ darkMode, setDarkMode }) => {
  return (
    <AppBarView title={'Warhammer API builder'} darkMode={darkMode} setDarkMode={setDarkMode} />
  );
};
