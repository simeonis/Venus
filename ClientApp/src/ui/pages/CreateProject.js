import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { ProjectEnums } from "../../constants/ProjectConstants"
import { ApiUrls } from "../../constants/ApiConstants"
import { Link } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";

export const CreateProject = () => {

    const projectColor = ProjectEnums.color

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState(projectColor.Red)
    const [nav, setNav] = useState(false)

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
                }
            })
            .catch(error => {
               
           
            });
    }

    const addProject = (project) => {
        console.log("hello add proj")
        axios.post(ApiUrls.project, project)
            .then(response => {
                if (response !== null) {
                    console.log("RESP ADD PROJECT " + JSON.stringify(response.data))

                    handleAddPeople(response.data.id)

                    //history.push("/")
                   // history.replace("/home")
                    
                }
            })
            .catch(error => {
                console.error('There was an error!', error.response);
            });
    }

    const projectColors = (color) => {
        switch (color) {
            case "Red":
                return "#ff0000"
            case "Blue":
                return "#0000ff"
            case "Green":
                return "#009933"
            case "Yellow":
                return "#ffff00"
            case "Orange":
                return "#ff6600"
            case "Purple":
                return "#9900cc"
            default:
                return "#fff"
        }
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
                    <input className="form-control" maxLength={25}  type="text" required="required" required onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label className="required">Project Description</label>
                    <input className="form-control" maxLength={80} type="text" required="required" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="required">Project Color</label>
                    <span id="select-span">
                    <select className="custom-select select-project" required="required" onChange={(e) => setColor(e.target.value)}>
                       {/* <option selected="selected" disabled="disabled">Select a Project Color</option>*/}
                        {
                            Object.keys(projectColor).map(key =>
                                <option style={{ color: projectColors(key) }} value={key}>{key}</option>
                            )
                        }
                        </select>
                        </span>
                </div>

                <div className="text-center panel-body">
                    <Link className="btn btn-primary m-10" to={{
                        pathname: `/home`
                    }}
                        onClick={(e) => handleSubmit(e)} >
                        Create Project
                    </Link>
                {/*    <button type="submit" className="btn btn-primary m-10" onClick={(e) => handleSubmit(e)}> Create Project</button>*/}
                </div>
            </form>
        </div>
    )
}
