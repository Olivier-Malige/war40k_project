import React from 'react';
import { Route, Switch } from 'react-router';
import { routeNames } from './CONSTANTS';
import { NotFound } from './NotFound';
import Authentication from 'src/pages/Authentication';
import Home from 'src/pages/Home';
import UnitsEditor from 'src/pages/UnitsEditor';

const RouterConfig: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path={routeNames.ROOT} component={Home} />
        <Route exact path={routeNames.UNITS_EDITOR} component={UnitsEditor} />
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
