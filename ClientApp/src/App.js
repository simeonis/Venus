import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './ui/components/Layout';
import { Home } from './ui/pages/Home';


import ApiAuthorizationRoutes from './routes/ApiAuthorizationRoutes';

import './ui/css/custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path="/accounts" component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
