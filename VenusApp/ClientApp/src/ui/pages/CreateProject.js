import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { ProjectEnums } from "../../constants/ProjectConstants"
import { ApiUrls } from "../../constants/ApiConstants"
import { useEffect } from 'react'


export const CreateProject = () => {

    const projectColor = ProjectEnums.color
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState(projectColor.Red)

    const [titleError, setTitleError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")

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

    const validTitle = () => {
        return title.length > 0 && title.length <= 25
    }
    const validDescription = () => {
        return description.length > 0 && description.length <= 80
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

    useEffect(() => {
        setTitleError(validTitle() ? "" : "Field cannot be empty")
        setDescriptionError(validDescription() ? "" : "Field cannot be empty")
    }, [title, description])

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1 className="p-15">Create a Project</h1>
            <button className="btn btn-primary float-group-tr" onClick={(e) => history.push({pathname: '/home'})}>Back</button>
            <form method="post" className="w-400 mw-full p-15">
                <div className="form-group">
                    <label className="required">Project Title</label>
                    <input className="form-control" maxLength={25} type="text" required="required" onChange={(e) => setTitle(e.target.value)} />
                    {!validTitle() ? < p className="text-danger font-size-12">{titleError}</p> : null}
                </div>
                <div className="form-group">
                    <label className="required">Project Description</label>
                    <input className="form-control" maxLength={80} type="text" required="required" onChange={(e) => setDescription(e.target.value)} />
                    {!validDescription() ? < p className="text-danger font-size-12">{descriptionError}</p> : null}
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
                    <button className="btn btn-primary w-half" disabled={!validDescription() || !validTitle()} onClick={(e) => handleSubmit(e)} >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    )
}
