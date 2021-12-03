import React, {useState, useEffect} from "react"
import { useLocation } from 'react-router-dom'
import axios from "axios";
import { ApiUrls } from "../../../constants/ApiConstants";
import "./manageAccess.css"

import {Modal} from "../../components/modal/Modal"

export const ManageAccess = () =>{
    
    const [modal, setModal] = useState(false)
    const [members, setMembers] = useState([])
    const [error, setError] = useState([])

    const location = useLocation()

    const { project } = location.state
    
    const handleAddPeople = (email) => {

        const userToProjDto = {
            projId : project.projId,
            userEmail: email,
        };

        axios.post(ApiUrls.addUserToProject, userToProjDto)
            .then(response => {
                if (response !== null) {
                    setMembers([response.data, ...members])
                }
            })
            .catch(error => {
                //setError(error.response);
                setError(error)
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
            projId : project.projId,
            userEmail: email,
        };
        
        axios.post(ApiUrls.removeUserFromProject, userToProjDto)
            .then(response => {
                if (response !== null) {
                    setMembers(response.data)
                }
            })
            .catch(error => {
                //setError(error.response);
                setError(error)
            });
    }
    
    const getMembers = () =>{
        axios.get(ApiUrls.getProjectMembers, { params: { projId: project.projId } })
            .then(response => {
                if (response !== null) {
                    setMembers([...response.data])
                }
            })
            .catch(error => {
                //setError(error.response);
                setError(error)
            });
    }

    useEffect(()=>{
        getMembers()
    }, [])
    
    return(
        <div className="m-15">
            <div>
                <h1>Manage Access</h1> 
            </div>
            {
                modal ? (
                    <Modal hideModal={hideModal}>
                            <form className="modal-form">
                                <div>
                                    <input  /><button>Search</button>
                                </div>
                                <button className="btn btn-primary btn-block mt-10" onClick={() => handleAddPeople()}>Add User</button>
                            </form>
                    </Modal>
                ) : null
            }
            <div className="manList d-flex align-items-center flex-column">
                <div className="d-flex justify-content-lg-end  w-lg-500">
                    <button className="btn btn-success" onClick={() => showModal()}>Add People</button>
                </div>
                <form className="mt-5">
                    <input type="text" className="form-control w-lg-500" placeholder="Search"  />
                </form>
                <div>
                    {
                        members.length > 0 ?
                        (
                            members.map(member =>(
                                <div>
                                    <h2>{member.name}</h2>
                                    <button onClick={() => handleRemovePeople(member.email)}>Remove</button>
                                </div>
                            ))

                        ) : <p>No Members in Project</p>
                    }
                </div>
            </div>
        </div>
    )
}