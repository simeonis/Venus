import React, { Fragment } from 'react';
import {Switch, useRouteMatch } from 'react-router';
import AuthorizeRoute from '../ui/components/AuthorizeRoute';
import {ManageAccess} from '../ui/pages/manageAccess/ManageAccess'
import Home from '../ui/pages/Home';
import {BugList} from "../ui/pages/bug/BugList";
import {CreateBug} from "../ui/pages/bug/CreateBug";
import {ModifyBug} from "../ui/pages/bug/ModifyBug";
import {CreateProject} from "../ui/pages/CreateProject";
import {ModifyProject} from "../ui/pages/ModifyProject";
import { ProjectDashboard } from '../ui/pages/ProjectDashboard';

export default function AuthorizedRoutes() {

    let { path } = useRouteMatch();

    return (
        <Fragment>
            <Switch>
                <AuthorizeRoute exact path={`${path}`} component={Home} redirectPath="/login" />
                <AuthorizeRoute exact path={`${path}home`} component={Home} redirectPath="/login" />
                <AuthorizeRoute exact path={`${path}createbug`} component={CreateBug} redirectPath="/login" />
                <AuthorizeRoute exact path={`${path}modifybug`} component={ModifyBug} redirectPath="/login" />
                
                <AuthorizeRoute exact path={`${path}createproject`} component={CreateProject} redirectPath="/login" />
                <AuthorizeRoute exact path={`${path}project-dashboard`} component={ProjectDashboard} redirectPath="/login" />
                <AuthorizeRoute exact path={`${path}project-bugs`} component={BugList} redirectPath="/login" />
                <AuthorizeRoute exact path={`${path}modifyproject`} component={ModifyProject} redirectPath="/login" />

                <AuthorizeRoute exact path={`${path}project-users`} component={ManageAccess} redirectPath="/login" />
                
            </Switch>
        </Fragment>
    );
}
