import React, {useContext, useState} from 'react';
import { NavMenu } from '../navbar/NavMenu';
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

            localStorage.setItem("theme", "dark");

            setDarkMode(true)
        }
        else{
            pWrap.classList.remove("dark-mode")
            localStorage.setItem("theme", "light");
            setDarkMode(false)
        }
    }
    
    return (
      <div id="page-wrap" className={authenticated? "layout-sidebar venus-page-wrap h-full overflow-hidden" : "layout venus-page-wrap h-full overflow-hidden"}>
          <div className="venus-header"> 
              <NavMenu className="venus-header" toggleSidebar={toggleSidebar} sidebar={sidebar} toggleDarkMode={toggleDarkMode} />
          </div>

          {
              authenticated?(
                  <div className="venus-sidebar h-full">
                      <Sidebar toggleSidebar={toggleSidebar} />
                  </div>
              ):null
          }
        

            <div className="venus-content overflow-auto">
                  {props.children}
          </div>
      </div>
    )
}