import React, {useContext, useEffect, useState} from "react"
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
                        {/* Set up for project links on sidebar*/}
                        {
                            projectList !== null ?(
                                projectList.map(project =>
                                    <Link 
                                        className="sidebar-link"
                                        to={{
                                            pathname: `/project-details?id=${project.id}`,
                                            query: project.id
                                        }}
                                    >{project.title}</Link>
                                )
                            ): null
                        }
                        <br/>

                        {/*Update this is an actual Project*/}
                        {/*<Link*/}
                        {/*    className="sidebar-link"*/}
                        {/*    to={{*/}
                        {/*        pathname: '/manage',*/}
                        {/*        state: {*/}
                        {/*            project: {projId: "a3f885d7-e6bd-478d-9bc9-aa979fae575e"}*/}
                        {/*        }*/}
                        {/*    }}>Manage</Link>*/}

                    </div>
                </div>
            </div>
        ):null
    )
}


