import React, {Component, useContext, useState} from 'react';
import { NavMenu } from '../NavMenu';
import {Sidebar} from "../sidebar/Sidebar";
import {AuthContext} from "../../../context/AuthContext";

import "./layout.css"

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
      <div id="page-wrap" className={authenticated? "layout-sidebar" : "layout"}>
          {/*<div className="venus-header">header</div>*/}
          <Sidebar className="venus-sidebar" toggleSidebar={toggleSidebar} />
          <NavMenu className="venus-header" toggleSidebar={toggleSidebar} sidebar={sidebar} toggleDarkMode={toggleDarkMode} />
          {/*<div className="venus-sidebar">sidebar</div>*/}
      
          {/*<div className="venus-content">content</div>*/}
          
   
        {/*<Sidebar className="venus-sidebar" toggleSidebar={toggleSidebar} />*/}
        {/*  */}
        <div className="venus-content border-left">
          {props.children}
        </div>
      </div>
    )
}