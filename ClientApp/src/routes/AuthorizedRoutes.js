import React, { Fragment } from 'react';
import {Switch, useRouteMatch } from 'react-router';
import AuthorizeRoute from '../ui/components/AuthorizeRoute';

export default function ApiAuthorizationRoutes() {

    let { path } = useRouteMatch();

    return (
        <Fragment>
            <Switch>
                <AuthorizeRoute exact path={path}>
                    <h1>Authorized!</h1>
                </AuthorizeRoute>
            </Switch>
        </Fragment>
    );

}
