import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {FaArrowLeft, FaArrowRight, FaMoon} from 'react-icons/fa';

export const NavMenu = ({sidebar, toggleSidebar, toggleDarkMode}) => {
  const [collapsed, setCollapsed] = useState(true)

  const { authenticated } = useContext(AuthContext);
  
  const toggleNavbar = () => {
   
  }
  
  return (
    <header className="container-fluid">
      <nav className="navbar">
          {
              authenticated? (
                  <button onClick={() => toggleSidebar()}>
                      {
                          sidebar ? <FaArrowLeft /> :  <FaArrowRight /> 
                      }
                  </button>
              ): null
          }
         

          <a href="#" className="navbar-brand">
            {/* <img src="..." alt="..." /> */}
            Venus
          </a>
          
          {/* <!-- Navbar nav --> */}
          {
              authenticated? null:(
              <ul className="navbar-nav d-none d-md-flex">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/bugs">View Bugs</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/createbug">Create Bug</Link>
                </li>
              </ul>
              )
          }
          <button onClick={() => toggleDarkMode()}>
              <FaMoon />
          </button>
      </nav>
    </header>
  );
}
