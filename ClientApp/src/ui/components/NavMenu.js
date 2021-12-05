import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import { FaMoon} from 'react-icons/fa';

export const NavMenu = ({toggleDarkMode}) => {

  const { authenticated, logout } = useContext(AuthContext);
  
  
  return (
    <header className="w-full">
      <nav className="navbar">
          {
              // authenticated? (
              //     //put drop down here
              //     // <button onClick={() => toggleSidebar()}>
              //     //     {
              //     //         sidebar ? <FaArrowLeft /> :  <FaArrowRight /> 
              //     //     }
              //     // </button>
              // ): null
          }
          
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
              </ul>
              )
          }
          <div className="w-full d-flex justify-content-end ">
              <button onClick={() => toggleDarkMode()}>
                  <FaMoon />
              </button>
              {
                  authenticated?(
                      <a href="#" className="sidebar-link" onClick={() =>logout()}>Logout</a>
                  ):null
              }
          </div>
         
      </nav>
    </header>
  );
}
