import React from 'react';
import { Switch, Route } from 'react-router';

import { publicRoutes } from './public-route';

export const PublicContainer = () => {
  return (
    <div className="main-page">
      <Switch>
        {publicRoutes.map((route) => (
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
