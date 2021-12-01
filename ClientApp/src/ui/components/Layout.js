import React, {Component, useContext, useState} from 'react';
import { NavMenu } from './NavMenu';
import {Sidebar} from "./Sidebar";
import {AuthContext} from "../../context/AuthContext";

export const Layout = (props) => {
    const [sidebar, setSidebar] = useState(true)
    const [darkMode, setDarkMode] = useState(false)

    const { authenticated } = useContext(AuthContext)
  
    const toggleSidebar = () => {
        let pWrap = document.getElementById("page-wrap");
        
        if(sidebar){
            pWrap.setAttribute("data-sidebar-hidden", "hidden")
            setSidebar(false)
        }
        else{
            pWrap.removeAttribute("data-sidebar-hidden");
            setSidebar(true)
        }
    }
    
    const toggleDarkMode = () =>{
        let pWrap = document.getElementById("page-wrap");

        if(!darkMode){
            pWrap.classList.add("dark-mode");

            setDarkMode(true)
        }
        else{
            pWrap.classList.remove("dark-mode")
            setDarkMode(false)
        }
    }
    
    return (
      <div id="page-wrap" className={authenticated? "page-wrapper with-navbar with-sidebar" : "page-wrapper with-navbar"}>
        <NavMenu toggleSidebar={toggleSidebar} sidebar={sidebar} toggleDarkMode={toggleDarkMode} />
        <Sidebar toggleSidebar={toggleSidebar} />
          
        <div className="content-wrapper">
          {props.children}
        </div>
      </div>
    )
}
