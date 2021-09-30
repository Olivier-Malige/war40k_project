import React from 'react';
import { Route, Switch } from 'react-router';
import { routeNames } from './CONSTANTS';
import { NotFound } from './NotFound';
import Authentication from 'src/pages/Authentication';
import Home from 'src/pages/Home';
import UnitsEditor from 'src/pages/UnitsEditor';
import { ProtectedRoute } from './ProtectedRoute';
import { Redirect } from 'react-router-dom';

const RouterConfig: React.FC = () => {
  return (
    <Switch>
      <ProtectedRoute component={Home} redirectTo={routeNames.LOGIN} path={routeNames.HOME} />
      <ProtectedRoute
        component={UnitsEditor}
        redirectTo={routeNames.LOGIN}
        path={routeNames.UNITS_EDITOR}
      />
      <Route path={routeNames.LOGIN}>
        <Authentication />
      </Route>
      <Route path="/">
        <Redirect to={routeNames.HOME} />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default RouterConfig;
