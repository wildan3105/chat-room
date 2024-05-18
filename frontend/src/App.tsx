import React, { Component, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch, Route, Redirect, Router } from 'react-router';
import { authActions } from './actions';

import { PrivateContainer, PublicContainer } from './containers';
import { IAppState } from './reducers';
import { history } from './utilities';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !rest.isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const App = (props: { authState: any }) => {
  const { authState } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.validateToken());
  }, []);

  return (
    <Router history={history}>
      <div className="p-3">
        <Switch>
          <PublicRoute
            path="/login"
            component={PublicContainer}
            isAuthenticated={authState.isAuthenticated}
          />
          <PrivateRoute
            component={PrivateContainer}
            isAuthenticated={authState.isAuthenticated}
          />
        </Switch>
      </div>
    </Router>
  );
};

function mapStateToProps(state: IAppState) {
  return {
    authState: state.authState,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
