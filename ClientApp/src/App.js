import React  from 'react';
import { Route } from 'react-router';
import { Layout } from './ui/components/Layout';
import { Home } from './ui/pages/Home';


import ApiAuthorizationRoutes from './routes/ApiAuthorizationRoutes';
import AuthorizedRoutes from './routes/AuthorizedRoutes';

import './ui/css/custom.css'
import { AuthProvider } from './context/AuthContext';
import AuthorizeRoute from "./ui/components/AuthorizeRoute";
import {Login} from "./ui/pages/Login";


const App = () => {

    return (
        <AuthProvider>
            <Layout>
                <Route path="/" component={AuthorizedRoutes} />
                <Route path="/" component={ApiAuthorizationRoutes} />
            </Layout>
        </AuthProvider>
    );
}

export default App