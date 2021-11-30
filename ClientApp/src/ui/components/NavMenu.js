import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header className="container-fluid dark-mode">
        <nav className="navbar">
            <a href="#" className="navbar-brand">
              {/* <img src="..." alt="..." /> */}
              Venus
            </a>

            {/* <!-- Navbar nav --> */}
            <ul className="navbar-nav d-none d-md-flex">
              <li className="nav-item">
                <Link className="nav-link" to="/accounts/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/accounts/signup">Signup</Link>
              </li>
            </ul>
        </nav>
      </header>
    );
  }
}
