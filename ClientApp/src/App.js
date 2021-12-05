import React  from 'react';
import { Route } from 'react-router';
import { Layout } from './ui/components/layout/Layout';
import { BugList } from './ui/pages/bug/BugList'
import { CreateBug } from './ui/pages/bug/CreateBug';

import ApiAuthorizationRoutes from './routes/ApiAuthorizationRoutes';
import AuthorizedRoutes from './routes/AuthorizedRoutes';

import './ui/css/custom.css'
import { AuthProvider } from './context/AuthContext';
import { CreateProject } from './ui/pages/CreateProject';
import { ModifyProject } from './ui/pages/ModifyProject';


const App = () => {

    return (
        <AuthProvider>
            <Layout>
                <Route path="/" component={AuthorizedRoutes} />
                <Route path="/" component={ApiAuthorizationRoutes} />
                <Route path="/bugs" component={BugList} />
                <Route path="/createbug" component={CreateBug} />
                <Route path="/createproject" component={CreateProject} />
                <Route path="/modifyproject" component={ModifyProject} />
            </Layout>
        </AuthProvider>
    );
}

export default App