import React, { Fragment } from 'react';
import { Route, Switch,useRouteMatch } from 'react-router';
import {Login} from "../ui/pages/Login";
import {Register} from "../ui/pages/Register";

export default function ApiAuthorizationRoutes() {

  let { path } = useRouteMatch();
    return(
      <Fragment>
          <Switch>
            <Route path={`${path}login`} component={Login} />
            <Route path={`${path}signup`} component={Register} />
        </Switch>
      </Fragment>
    );
}
