import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { ProjectEnums } from "../../constants/ProjectConstants"
import { ApiUrls } from "../../constants/ApiConstants"
import { Link } from 'react-router-dom';

export const CreateProject = () => {

    const projectColor = ProjectEnums.color

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState(projectColor.Red)

    const history = useHistory()

    const addProject = (projectDto) => {
        console.log("hello add proj")
        axios.post(ApiUrls.project, projectDto)
            .then(response => {
                if (response !== null) {
                    console.log("RESP " + JSON.stringify(response.data))
                    // Go back to bug list
                    history.push('/')
                }
            })
            .catch(error => {
                // setError(error.response);
                console.error('There was an error!', error.response);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault()


        const projectDto = {
            title: title,
            description: description,
            color: color
        }

        addProject(projectDto)
    }
    return (

        <div className="container">
            <h1>Create a Project</h1>
            <form method="post">
                <div className="form-group">
                    <label>Project Title</label>
                    <input className="form-control" type="text" required onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Project Description</label>
                    <input className="form-control" type="text" required onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Project Color</label>
                    <select className="custom-select" onChange={(e) => setColor(e.target.value)}>
                        <option selected="selected" disabled="disabled">Select a project color</option>
                        {
                            Object.keys(projectColor).map(key =>
                                <option value={key}>{key}</option>
                            )

                        }
                    </select>
                </div>

                <div className="text-center panel-body">
                    <button className="btn btn-primary m-10" onClick={() => history.goBack()}>Back</button>
                    <button type="submit" className="btn btn-primary m-10" onClick={(e) => handleSubmit(e)}> Create Project</button>
                </div>
            </form>
        </div>
    )
}
