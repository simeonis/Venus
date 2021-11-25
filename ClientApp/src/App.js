import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './ui/components/Layout';
import { Home } from './ui/pages/Home';


import ApiAuthorizationRoutes from './routes/ApiAuthorizationRoutes';

import './ui/css/custom.css'
import { AuthProvider } from './context/AuthContext';

const App = () => {

    return (
        <Layout>
            <AuthProvider>
                <Route exact path='/' component={Home} />
                <Route path="/accounts" component={ApiAuthorizationRoutes} />
            </AuthProvider>
        </Layout>
    );
}

export default App