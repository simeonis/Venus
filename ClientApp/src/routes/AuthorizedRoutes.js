import React, { Fragment } from 'react';
import {Switch, useRouteMatch } from 'react-router';
import AuthorizeRoute from '../ui/components/AuthorizeRoute';
import {ManageAccess} from '../ui/pages/manageAccess/ManageAccess'
import Auth from '../ui/pages/Auth';

export default function AuthorizedRoutes() {

    let { path } = useRouteMatch();

    return (
        <Fragment>
            <Switch>
                <AuthorizeRoute path={`${path}`} component={Auth} redirectPath="/login" />
                <AuthorizeRoute path={`${path}home`} component={Auth} redirectPath="/login" />
                <AuthorizeRoute path={`${path}manage`} component={ManageAccess} />
            </Switch>
        </Fragment>
    );
}
