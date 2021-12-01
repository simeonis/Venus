import React, {Component, useState} from 'react';
import { NavMenu } from './NavMenu';
import {Sidebar} from "./Sidebar";

export const Layout = (props) => {
    const [sidebar, setSidebar] = useState(true)
  
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

    
    return (
      <div id="page-wrap" className="page-wrapper with-navbar with-sidebar dark-mode">
        <NavMenu toggleSidebar={toggleSidebar} sidebar={sidebar} />
        <Sidebar toggleSidebar={toggleSidebar} />
          
        <div className="content-wrapper">
          {props.children}
        </div>
      </div>
    )
}
