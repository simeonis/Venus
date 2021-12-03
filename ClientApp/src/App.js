import React  from 'react';
import { Route } from 'react-router';
import { Layout } from './ui/components/Layout';
import { Home } from './ui/pages/Home';
import { BugList } from './ui/pages/Bug/BugList';

import ApiAuthorizationRoutes from './routes/ApiAuthorizationRoutes';
import AuthorizedRoutes from './routes/AuthorizedRoutes';

import './ui/css/custom.css'
import { AuthProvider } from './context/AuthContext';


const App = () => {

    return (
        <AuthProvider>
            <Layout>
                <Route path="/" component={AuthorizedRoutes} />
                <Route path="/" component={ApiAuthorizationRoutes} />
                <Route path="/bugs" component={BugList} />
            </Layout>
        </AuthProvider>
    );
}

export default App