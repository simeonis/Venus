import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ProjectEnums } from "../../constants/ProjectConstants"
import { ApiUrls } from "../../constants/ApiConstants"
import { Link, useLocation, useHistory } from 'react-router-dom';


export const ModifyProject = () => {

    //states used to get and set properties
    const projectColor = ProjectEnums.color
    const [project, setProject] = useState({});
    const [title, setTitle] = useState(project.title)
    const [description, setDescription] = useState(project.description)
    const [color, setColor] = useState(projectColor.Red)




    //setTitle(location.title)
    const history = useHistory()
    const location = useLocation();
    console.log("location" + location)
    console.log(location.query)

    //Switch for color in select menu
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

    //API call to get project with specific ID to update
    const getProject = (projectId) => {
        console.log("getting project")
        console.log(projectId)
        axios.get(ApiUrls.project + `/${projectId}`)
            .then(response => {
                if (response !== null) {
                    console.log("response : " + JSON.stringify(response.data))
                    setProject(response.data)
                    console.log("project is:" + project)
                }
            })
            .catch(error => {
                console.error('There was an error.', error.response)
            })
    }



    //API call to update the project in the DB via HttpPUT
    const updateProject = (projectUpdate) => {
        axios.put(ApiUrls.project, projectUpdate)
            .then(response => {
                if (response !== null) {
                    console.log("RESP " + JSON.stringify(response.data))
                    // Go back to homepage(auth)
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
            id: project.id,
            title: title,
            description: description,
            color: color
        }

        updateProject(projectDto)
    }

    //hook to load projects and set project attributes for editting
    useEffect(() => {
        getProject(location.query.pId)
        //TO DO: sets the title and desc but will not add them to project until field is editted
        setProject(project)
        setTitle(location.query.pTitle)
        setDescription(location.query.pDesc)
        setColor(location.query.pColor)
        //setColor(color)


    }, [])

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1 className="p-15">Modify Project</h1>
           {/* <h2 className="p-15">{project.title}</h2>*/}
            <form method="post" className="w-400 mw-full p-15">
                <div className="form-group">

                    <label className="required">Project Title</label>
                    <input className="form-control" required="required" maxLength={25} defaultValue={project.title} type="text" onChange={(e) => setTitle(e.target.value)} onLoad={(e) => { setTitle(title) }} />
                </div>
                <div className="form-group">
                    <label className="required">Project Description</label>
                    <input className="form-control" maxLength={65} required="required" defaultValue={project.description} type="text" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="required">Project Color</label>
                    <select className="custom-select select-project" defaultValue={project.color} onChange={(e) => setColor(e.target.value)}>
                        {/* <option selected="selected" disabled="disabled">value={project.color}</option>*/}
                        {
                            Object.keys(projectColor).map((key, i) =>
                                <option key={i} style={{ color: projectColors(key) }} value={projectColor[key]}>{projectColor[key]}</option>
                            )

                        }
                        </select>
                </div>

                <div className="text-center panel-body">

                    <button type="submit" className="btn btn-primary m-10" onClick={(e) => handleSubmit(e)}> Update Project</button>
                </div>
            </form>

        </div>
    )
}
