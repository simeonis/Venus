import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { ProjectEnums } from "../../constants/ProjectConstants"
import { ApiUrls } from "../../constants/ApiConstants"
import { AuthContext } from "../../context/AuthContext";

export const CreateProject = () => {

    const projectColor = ProjectEnums.color
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState(projectColor.Red)
    const { user, getProjects } = useContext(AuthContext)
    const history = useHistory()

    const handleAddPeople = (id) => {
        const userToProjDto = {
            projId : id,
            userEmail: user.email,
        };

        axios.post(ApiUrls.addUserToProject, userToProjDto)
            .then(response => {
                if (response !== null) {
                    getProjects()
                    history.push("/home")
                }
            })
            .catch(error => {
                console.error('There was an error!', error.response);
            });
    }

    const addProject = (project) => {
        axios.post(ApiUrls.project, project)
            .then(response => {
                if (response !== null) {
                    handleAddPeople(response.data.id)
                }
            })
            .catch(error => {
                console.error('There was an error!', error.response);
            });
    }

    //sumbission handler for adding a project
    //creates a project with the states set from the text fields to be added to the DB
    const handleSubmit = (e) => {
        e.preventDefault()

        const project = {
            title: title,
            description: description,
            color: color,
        }
        addProject(project)
    }
    return (
        <div className="container d-flex flex-column align-items-center">

            <h1 className="p-15">Create a Project</h1>
            <form method="post" className="w-400 mw-full p-15">
                <div className="form-group">
                    <label className="required">Project Title</label>
                    <input className="form-control" maxLength={25}  type="text" required="required" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label className="required">Project Description</label>
                    <input className="form-control" maxLength={80} type="text" required="required" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="required">Project Color</label>
                    <span id="select-span">
                    <select className="form-control" required="required" onChange={(e) => setColor(e.target.value)}>
                        {
                            Object.keys(projectColor).map(key =>
                                <option value={key}>{key}</option>
                            )
                        }
                        </select>
                        </span>
                </div>

                <div className="text-center panel-body">
                    <button className="btn btn-primary m-10" onClick={(e) => handleSubmit(e)} >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    )
}
