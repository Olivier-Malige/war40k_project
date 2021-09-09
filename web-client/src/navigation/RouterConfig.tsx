import React from 'react';
import { Route, Switch } from 'react-router';
import { routeNames } from './CONSTANTS';
import { NotFound } from './NotFound';
import Authentication from 'src/pages/Authentication';
import Home from 'src/pages/Home';
import Dashboard from 'src/pages/Dashboard';

const RouterConfig: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path={routeNames.ROOT} component={Home} />
        <Route exact path={routeNames.DASHBOARD} component={Dashboard} />
        <Route path={routeNames.LOGIN}>
          <Authentication />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default RouterConfig;
