import React, {useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {AuthContext} from "../../../context/AuthContext";
import { FaMoon} from 'react-icons/fa';
import "./navmenu.css"

export const NavMenu = ({toggleDarkMode}) => {

  const { authenticated, logout } = useContext(AuthContext);
  
  const location  = useLocation();
  
  console.log("Location p " +  JSON.stringify(location))
  
  return (
    <header className="w-full h-full ">
      <nav className="navbar h-full my-nav">

          <div className="w-full d-flex justify-content-start align-items-center mr-10">
          {
              (location.pathname.split("-")[0] === "/project" ) ? (
                  <ul className="navbar-nav d-none d-md-flex">
                      <li className="nav-item">
                          <Link className="nav-link" to={{
                              pathname: `/project-dashboard`,
                              query: location.query
                          }}>Dashboard</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link " to={{
                              pathname: `/project-bugs`,
                              query: location.query
                          }}>Bugs</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link " to={{
                              pathname: `/project-users`,
                              query: location.query
                          }}>Users</Link>
                      </li>
                  </ul>
              ):null

          }
          </div>
          
              <div className="w-full d-flex justify-content-end align-items-center mr-10">
                  <FaMoon className="fake-btn" onClick={() => toggleDarkMode()} />
         
              {
                  authenticated?(
                      <a href="#" className="sidebar-link" onClick={() =>logout()}>Logout</a>
                  ):(
                      <ul className="navbar-nav d-none d-md-flex">
                          <li className="nav-item">
                              <Link className="nav-link" to="/login">Login</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link " to="/signup">Signup</Link>
                          </li>
                      </ul>
                  )
              }
          </div>
         
      </nav>
    </header>
  );
}
