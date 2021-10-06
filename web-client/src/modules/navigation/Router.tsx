import React from 'react';
import { Route, Switch } from 'react-router';
import { routeNames } from './CONSTANTS';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthPage } from 'src/modules/navigation/pages/AuthPage';
import { HomePage } from 'src/modules/navigation/pages/HomePage';
import { UsersPage } from 'src/modules/navigation/pages/UsersPage';
import { UnitsEditorPage } from 'src/modules/navigation/pages/UnitsEditorPage';
import { ProtectedRoute } from './ProtectedRoute';
import { Redirect } from 'react-router-dom';
import { Box } from '@mui/system';

const Router: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: theme => theme.palette.background.default,
      }}
    >
      <Switch>
        <ProtectedRoute component={HomePage} redirectTo={routeNames.LOGIN} path={routeNames.HOME} />
        <ProtectedRoute
          component={UnitsEditorPage}
          redirectTo={routeNames.LOGIN}
          path={routeNames.UNITS_EDITOR}
        />
        <ProtectedRoute
          component={UsersPage}
          redirectTo={routeNames.LOGIN}
          path={routeNames.USERS}
        />
        <Route path={routeNames.LOGIN}>
          <AuthPage />
        </Route>
        <Route path="/">
          <Redirect to={routeNames.HOME} />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Box>
  );
};

export default Router;
