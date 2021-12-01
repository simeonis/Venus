import React, {Component, useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";

export const NavMenu = ({sidebar, toggleSidebar, toggleDarkMode}) => {
  const [collapsed, setCollapsed] = useState(true)

  const { logout, authenticated } = useContext(AuthContext);
  
  const toggleNavbar = () => {
   
  }
  
  return (
    <header className="container-fluid">
      <nav className="navbar">

          <button onClick={() => toggleSidebar()}>
              <i className={ sidebar ? "fas fa-arrow-left" : "fas fa-arrow-right" }/>
          </button>

          <a href="#" className="navbar-brand">
            {/* <img src="..." alt="..." /> */}
            Venus
          </a>

          {/* <!-- Navbar nav --> */}
        {
          authenticated? (
              <ul className="navbar-nav d-none d-md-flex">
                <li className="nav-item">
                  <Link className="nav-link" to="/accounts/login" onClick={() => logout()}>Logout</Link>
                </li>
              </ul>
          ):(
          <ul className="navbar-nav d-none d-md-flex">
            <li className="nav-item">
              <Link className="nav-link" to="/accounts/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/accounts/signup">Signup</Link>
            </li>
          </ul>
          )
        }
        <button onClick={() => toggleDarkMode()}>
            <i className="fas fa-moon" />
        </button>
      </nav>
    </header>
  );
}
