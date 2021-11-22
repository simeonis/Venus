import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className="page-wrapper dark-mode">
        <h1>Home Page</h1>
        <button className="btn btn-danger" type="button">Danger</button>
      </div>
    );
  }
}
