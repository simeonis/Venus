import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ProjectEnums } from "../../constants/ProjectConstants"
import { ApiUrls } from "../../constants/ApiConstants"
import { Link, useLocation, useHistory } from 'react-router-dom';


export const ModifyProject = () => {

    //states used to get and set properties
    const projectColor = ProjectEnums.color
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState(projectColor.Red)
    const [projectId, setProjectId] = useState("")

    const [titleError, setTitleError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")

    const history = useHistory()
    const location = useLocation();

    const validTitle = () => {
        return title.length > 0 && title.length <= 25
    }
    const validDescription = () => {
        return description.length > 0 && description.length <= 80
    }

    //API call to update the project in the DB via HttpPUT
    const updateProject = (projectUpdate) => {
        axios.put(ApiUrls.project, projectUpdate)
            .then(response => {
                if (response !== null) {
                    history.push('/home')
                }
            })
            .catch(error => {
                console.error('There was an error!', error.response);
            });
    }

    //handles the submission to update from button click
    const handleSubmit = (e) => {
        e.preventDefault()

        //creates a DTO to send to the API
        const projectDto = {
            id: projectId,
            title: title,
            description: description,
            color: color
        }

        updateProject(projectDto)
    }

    //hook to load projects and set project attributes for editting
    useEffect(() => {
        const project = location.state
        setProjectId(project.id)
        setTitle(project.title)
        setDescription(project.description)
        setColor(project.color)
    }, [])

    //hook to load projects and set project attributes for editting
    useEffect(() => {
        setTitleError(validTitle() ? "" : "Field cannot be empty")
        setDescriptionError(validDescription() ? "" : "Field cannot be empty")
    }, [title, description])

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1 className="p-15">Modify Project</h1>
            <button className="btn btn-primary float-group-tr" onClick={(e) => history.push({ pathname: '/home' })}>Back</button>
            <form method="post" className="w-400 mw-full p-15">
                <div className="form-group">
                    <label className="required">Project Title</label>
                    <input className="form-control" required="required" maxLength={25} value={title} type="text" onChange={(e) => setTitle(e.target.value)} onLoad={(e) => { setTitle(title) }} />
                    {!validTitle() ? < p className="text-danger font-size-12">{titleError}</p> : null}
                </div>
                <div className="form-group">
                    <label className="required">Project Description</label>
                    <input className="form-control" maxLength={65} required="required" value={description} type="text" onChange={(e) => setDescription(e.target.value)} />
                    {!validDescription() ? < p className="text-danger font-size-12">{descriptionError}</p> : null}
                </div>
                <div className="form-group">
                    <label className="required">Project Color</label>
                    <select className="form-control" value={color} onChange={(e) => setColor(e.target.value)}>
                        {
                            Object.keys(projectColor).map((key, i) =>
                                <option key={i} value={projectColor[key]}>{projectColor[key]}</option>
                            )
                        }
                        </select>
                </div>
                <div className="text-center panel-body">
                    <button type="submit" className="btn btn-primary w-half" disabled={!validDescription() || !validTitle()}  onClick={(e) => handleSubmit(e)}> Update Project</button>
                </div>
            </form>

        </div>
    )
}
