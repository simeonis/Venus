﻿import React, {useState, useEffect, useContext} from "react"
import { useLocation } from 'react-router-dom'
import axios from "axios";
import { ApiUrls } from "../../../constants/ApiConstants";
import "./manageAccess.css"
import { FaTimes, FaPlusCircle, FaCrown } from 'react-icons/fa';

import {Modal} from "../../components/modal/Modal"
import {AuthContext} from "../../../context/AuthContext";

export const ManageAccess = () =>{
    
    const [modal, setModal] = useState(false)
    const [members, setMembers] = useState([])
    const [user, setUser] = useState()
    const [addError, setAddAddError] = useState("")
    const [deleteError, setDeleteError] = useState("")
    const [email, setEmail] = useState("")
    const [project, setProject] = useState({})

    const location = useLocation()
    
    const { getProjects, projectList} = useContext(AuthContext)
    
    const handleAddPeople = () => {

        const userToProjDto = {
            projId : project.id,
            userEmail: user.email,
        };

        axios.post(ApiUrls.addUserToProject, userToProjDto)
            .then(response => {
                if (response !== null) {
                    setMembers([response.data, ...members])
                    setModal(false)
                }
            })
            .catch(error => {
                //setError(error.response);
                console.log("ERROR " + JSON.stringify(error.response.data) )
                setAddAddError(error.response.data)
            });
    }

    const showModal = () =>{
        setModal(true)
    }
    const hideModal = () =>{
        setModal(false)
    }

    const handleRemovePeople = (email) => {
        
        const userToProjDto = {
            projId : project.id,
            userEmail: email,
        };
        
        axios.delete(ApiUrls.removeUserFromProject,{ data: userToProjDto })
            .then(response => {
                if (response !== null) {
                    setMembers([...response.data])
                }
            })
            .catch(error => {
                console.log("ERROR " + JSON.stringify(error.response.data) )
                setDeleteError(error.response.data)
            });
    }
    
    const getMembers = (id) =>{
        axios.get(ApiUrls.getProjectMembers, { params: { id: id } })
            .then(response => {
                if (response !== null) {
                    setMembers([...response.data])
                }
            })
            .catch(error => {
                setAddAddError(error)
            });
    }
    
    const searchUser = (e) =>{
        e.preventDefault()
        
        axios.get(ApiUrls.searchUser, { params: { email: email } })
            .then(response => {
                if (response !== null) {
                    setUser(response.data)
                }
            })
            .catch(error => {
                setAddAddError(error.response)
            });
    }
    
    useEffect(() => {
        // Refresh list of projects
        getProjects()
        const currProj = projectList.find(proj => proj.id === location.query)
        setProject(currProj)
        getMembers(currProj.id)
    }, [])
    
    return(
        <div className="m-15">
            {
                modal ? (
                    <Modal hideModal={hideModal}>
                        <div className="w-500 h-150">
                            <form className="modal-form w-full">
                                <p className="text-danger">{addError}</p>
                                <div className="d-flex justify-content-between w-full">
                                    <input className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)}  />
                                    <button className="btn btn-primary" onClick={(e) => searchUser(e)}>Search</button>
                                </div>
                            </form>
                            <div className="user-dropdown pt-5">
                                {
                                    user ? (
                                        <div className="d-flex my-5 shadow user-found-row">
                                            <div className="w-full">
                                                <p className="ml-5">{user.userName}</p>
                                            </div>
                                            <div className="w-full d-flex justify-content-end align-items-center p-5">
                                                <FaPlusCircle className="text-primary " onClick={() => handleAddPeople()} />
                                            </div>
                                        </div>
                                    ): null
                                }
                            </div>
                        </div>
                    </Modal>
                ) : null
            }
            <div className="manList d-flex align-items-center justify-content-center flex-column mw-550">
                <div className="intern-wrap">
                    <div className="d-flex">
                        <div className="title p-0 m-0">
                            <h3>Manage Access</h3>
                        </div>
                        <div className="d-flex justify-content-end align-items-center  w-full">
                            <button className="btn btn-success" onClick={() => showModal()}>Add People</button>
                        </div>
                    </div>
                    
                    <div className="w-full border mt-5">
                        <form className="mt-5 w-full p-10 border-bottom">
                            <input type="text" className="form-control w-full" placeholder="Search"  />
                        </form>
                        <div className="pt-15 w-full p-10">
                            <p className="text-danger">{deleteError}</p>
                            {
                                members.length > 0 ?
                                    (
                                        members.map((member, idx) =>(
                                            <div key={idx} className="d-flex justify-content-start align-items-center  w-full shadow-lg user-card mt-10">
                                                <div className="d-flex p-5 align-items-end">
                                                    <div className="d-flex flex-column p-5 ">
                                                        {
                                                            member.id === project.ownerID ?(
                                                                <FaCrown color={'#ffd22a'}  />

                                                            ) 
                                                            : null
                                                        }
                                                        <h3 className="font-size-16 p-0 m-0 text-decoration-underline font-weight-semi-bold">UserName</h3>
                                                        <h3 className="font-size-16 p-0 m-0">{member.userName}</h3>
                                                    </div>
                                                    <div className="d-flex flex-column p-5 h-full">
                                                      
                                                        <h3 className="font-size-16 p-0 m-0 text-decoration-underline font-weight-semi-bold">Email</h3>
                                                        <h3 className="font-size-16 p-0 m-0">{member.email}</h3>
                                                      
                                                    </div>
                                                </div>

                                                {
                                                    member.id !== project.ownerID ? (
                                                        <div className="d-flex w-full justify-content-end">
                                                            <FaTimes className="text-danger m-15"  size={25} onClick={() => handleRemovePeople(member.email)} />
                                                        </div>
                                                    ) 
                                                    : null
                                                }
                               
                                            </div>
                                        ))

                                    ) : <p>No Members in Project</p>
                            }
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
}