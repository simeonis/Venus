import React, { Component, Fragment } from 'react';
import { Route, Switch,useRouteMatch } from 'react-router';
// import { Login } from '../ui/components/authorization/Login2'
// import { Logout } from '../ui/components/authorization/Logout'
// import { ApplicationPaths, LoginActions, LogoutActions } from '../constants/ApiAuthorizationConstants';

import {Login} from "../ui/pages/Login";
import {SignUp} from "../ui/pages/SignUp";

export default function ApiAuthorizationRoutes() {

  let { path } = useRouteMatch();

 
    return(
      <Fragment>
          <Switch>
            <Route exact path={path}>
                <h1>Auth</h1>
            </Route>
            <Route path={`${path}/login`} component={Login} />
            <Route path={`${path}/signup`} component={SignUp} />
        </Switch>
      </Fragment>
    );
  
}
