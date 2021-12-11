import React, {useContext} from "react"
import {AuthContext} from "../../../context/AuthContext";
import { Link } from 'react-router-dom';
import "./sidebar.css"

import {GiVenusFlytrap} from 'react-icons/gi';

export const Sidebar = () =>{
    
    const { authenticated, projectList } = useContext(AuthContext)
    
    return(
        authenticated ?(
            <div className="h-full">
                <div className="my-sidebar h-full shadow">
                    <div className="brand-wrap">
                        <Link to="/home" className="sidebar-brand">
                            <GiVenusFlytrap className="mr-5" color={"#46954a"} />
                            Venus
                        </Link>
                    </div>
                   
                    <div className="sidebar-menu">

                        <div className="sidebar-divider" />
                        
                        <h5 className="sidebar-title">Projects</h5>
                        
                        <div className="sidebar-divider" />
                        {
                            projectList !== null ?(
                                projectList.map((project, i) =>
                                    <Link
                                        key={i}
                                        className="sidebar-link text-truncate"
                                        to={{
                                            pathname: `/project-dashboard`,
                                            query: project.id
                                        }}
                                    >{project.title}</Link>
                                )
                            ): null
                        }
                        <br/>
                    </div>
                </div>
            </div>
        ):null
    )
}


