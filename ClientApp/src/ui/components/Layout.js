import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="page-wrapper with-navbar dark-mode">
        <NavMenu />
        <div className="content-wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}
