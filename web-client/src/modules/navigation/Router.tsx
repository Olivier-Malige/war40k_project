import React from 'react';
import { Route, Switch } from 'react-router';
import { routeNames } from './CONSTANTS';
import { NotFoundPage } from './pages/NotFoundPage';
import Authentication from 'src/modules/navigation/pages/Authentication';
import { HomePage } from 'src/modules/navigation/pages/HomePage';
import { UsersPage } from 'src/modules/navigation/pages/UsersPage';
import UnitsEditor from 'src/modules/navigation/pages/UnitsEditor';
import { ProtectedRoute } from './ProtectedRoute';
import { Redirect } from 'react-router-dom';

const Router: React.FC = () => {
  return (
    <Switch>
      <ProtectedRoute component={HomePage} redirectTo={routeNames.LOGIN} path={routeNames.HOME} />
      <ProtectedRoute
        component={UnitsEditor}
        redirectTo={routeNames.LOGIN}
        path={routeNames.UNITS_EDITOR}
      />
      <ProtectedRoute component={UsersPage} redirectTo={routeNames.LOGIN} path={routeNames.USERS} />
      <Route path={routeNames.LOGIN}>
        <Authentication />
      </Route>
      <Route path="/">
        <Redirect to={routeNames.HOME} />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default Router;
