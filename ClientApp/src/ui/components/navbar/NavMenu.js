import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../../context/AuthContext";
import { FaMoon} from 'react-icons/fa';
import "./navmenu.css"

export const NavMenu = ({toggleDarkMode}) => {

  const { authenticated, logout } = useContext(AuthContext);
  
  return (
    <header className="w-full h-full ">
      <nav className="navbar h-full my-nav">
          <div className="w-full d-flex justify-content-end align-items-center mr-10">
        
                  <FaMoon onClick={() => toggleDarkMode()}/>
         
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
