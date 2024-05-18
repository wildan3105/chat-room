import React from 'react';
import { Switch, Route } from 'react-router';

import { privateRoutes } from './private-route';

export const PrivateContainer = () => {
  return (
    <div className="main-page">
      <Switch>
        {privateRoutes.map((route) => (
          <Route
            key={`page-${route.name}`}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  );
};
