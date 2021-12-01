import React from "react"

export const Sidebar = ({toggleSidebar}) =>{
    
    return(
        <div className="sidebar">
            <div className="sidebar-menu">
     
                <a href="#" className="sidebar-brand">
                    {/*<img src="..." alt="..." />*/}
                        Venus
                </a>
                <div className="sidebar-divider" />
     
                {/*<div className="sidebar-content">*/}
                {/*    <input type="text" className="form-control" placeholder="Search">*/}
                {/*        <div*/}
                {/*            className="mt-10 font-size-12">*/}
                {/*            Press <kbd>/</kbd> to focus*/}
                {/*        </div>*/}
                {/*    </input>*/}
                {/*</div>*/}
 
                <h5 className="sidebar-title">Projects</h5>
                <div className="sidebar-divider" />
                <a href="#" className="sidebar-link">Add Project</a>
                <a href="#" className="sidebar-link">Existing Project</a>
                <a href="#" className="sidebar-link">Existing Project</a>
                <br/>
                <h5 className="sidebar-title">Account</h5>
                <div className="sidebar-divider" />
                <a href="#" className="sidebar-link">Settings</a>
                <a href="#" className="sidebar-link">Logout</a>
            </div>
        </div>
    )
}


