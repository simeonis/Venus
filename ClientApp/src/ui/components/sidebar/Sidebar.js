import React, {useContext, useEffect, useState} from "react"
import {AuthContext} from "../../../context/AuthContext";
import { Link } from 'react-router-dom';
import axios from "axios";
import {ApiUrls} from "../../../constants/ApiConstants";
import "./sidebar.css"

export const Sidebar = ({toggleSidebar}) =>{
    
    const { authenticated, user } = useContext(AuthContext)
    const [projectList, setProjectList] = useState([])

    const getProjects = () => {
        console.log("getting projects")
        axios.get(ApiUrls.project)
            .then(response => {
                if (response !== null) {
                    console.log("response : " + JSON.stringify(response.data))
                    setProjectList(response.data)
                }
            })
            .catch(error => {
                console.error('There was an error.', error.response)
            })
    }
    
    useEffect(()=>{
        getProjects()
    },[])
    
    return(
       
        authenticated ?(
            <div className=" h-full">
                <div>
                    <div className="brand-wrap">
                        <a href="#" className="sidebar-brand">
                            {/*<img src="..." alt="..." />*/}
                            Venus
                        </a>
                    </div>
                   
                    <div className="sidebar-menu">

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
                        {
                            projectList.map(p =>(
                                <a href="#" className="sidebar-link">{p.title}</a>
                            ))
                        }
                        {/*<a href="#" className="sidebar-link">Existing Project</a>*/}
                        {/*<a href="#" className="sidebar-link">Existing Project</a>*/}
                        <Link className="sidebar-link" to="/createproject">Create Project</Link>
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

                    </div>
                </div>
            </div>
        ):null
    )
}


