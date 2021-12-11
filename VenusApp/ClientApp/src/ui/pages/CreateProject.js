﻿import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { ProjectEnums } from "../../constants/ProjectConstants"
import { ApiUrls } from "../../constants/ApiConstants"


export const CreateProject = () => {

    const projectColor = ProjectEnums.color
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState(projectColor.Red)

    const history = useHistory()

    const addProject = (project) => {
        axios.post(ApiUrls.project, project)
            .then(response => {
                if (response !== null) {
                    history.push("/home")
                }
            })
            .catch(error => {
                console.error('There was an error!', error.response);
            });
    }

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
            <button className="btn btn-primary float-group-tr" onClick={(e) => history.push({pathname: '/home'})}>Back</button>
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
                    <button className="btn btn-primary w-half" onClick={(e) => handleSubmit(e)} >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    )
}