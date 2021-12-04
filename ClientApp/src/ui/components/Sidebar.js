import React, {useContext} from "react"
import {AuthContext} from "../../context/AuthContext";
import { Link } from 'react-router-dom';

export const Sidebar = ({toggleSidebar}) =>{
    
    const { authenticated, logout } = useContext(AuthContext)
    
    return(
        authenticated ?(
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
                    
                    {/*Update this is an actual Project*/}
                    <Link
                        className="sidebar-link"
                        to={{
                        pathname: '/manage',
                        state: {
                            project: {projId: "a3f885d7-e6bd-478d-9bc9-aa979fae575e"}
                        }
                    }}>Manage</Link>
                    <a href="#" className="sidebar-link">Settings</a>
                    <a href="#" className="sidebar-link" onClick={() =>logout()}>Logout</a>
                </div>
            </div>
        ):null
    )
}


