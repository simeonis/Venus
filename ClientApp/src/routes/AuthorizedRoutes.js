import React, { Fragment } from 'react';
import {Switch, useRouteMatch } from 'react-router';
import AuthorizeRoute from '../ui/components/AuthorizeRoute';
import {ManageAccess} from '../ui/pages/manageAccess/ManageAccess'
import Home from '../ui/pages/Home';

export default function AuthorizedRoutes() {

    let { path } = useRouteMatch();

    return (
        <Fragment>
            <Switch>
                <AuthorizeRoute exact path={`${path}`} component={Home} redirectPath="/login" />
                <AuthorizeRoute exact path={`${path}home`} component={Home} redirectPath="/login" />
                <AuthorizeRoute exact path={`${path}manage`} component={ManageAccess} />
            </Switch>
        </Fragment>
    );
}
