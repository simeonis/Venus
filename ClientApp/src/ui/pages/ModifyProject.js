import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ProjectEnums } from "../../constants/ProjectConstants"
import { ApiUrls } from "../../constants/ApiConstants"
import { Link, useLocation, useHistory } from 'react-router-dom';


export const ModifyProject = () => {

    const projectColor = ProjectEnums.color

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState(projectColor.Red)

    const [project, setProject] = useState({});


    //setTitle(location.title)
    const history = useHistory()
    const location = useLocation();
    console.log(location)
    console.log("hello")
    console.log(location.query)
    console.log(location.pathname)

    const getProject = (projectId) => {
        console.log("getting projects")
        console.log(projectId)
        axios.get(ApiUrls.project+`/${projectId}`)
            .then(response => {
                if (response !== null) {
                    console.log("response : " + JSON.stringify(response.data))
                    setProject(response.data)
                    console.log(response.data)
                }
            })
            .catch(error => {
                console.error('There was an error.', error.response)
            })
    }




    const updateProject = (projectUpdate) => {
        axios.put(ApiUrls.project, projectUpdate)
            .then(response => {
                if (response !== null) {
                    console.log("RESP " + JSON.stringify(response.data))
                    // Go back to bug list
                    history.push('/home')
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
            id: project.id,
            title: title,
            description: description,
            color: color
        }

        updateProject(projectDto)
    }

    useEffect(() => {
        getProject(location.query)
        
    }, [])

    return (

        <div className="container">
            <button className="btn btn-primary m-10" onClick={() => history.goBack()}> Back</button>
            <h1>Modify Project</h1>
            <h2>{project.title}</h2>
            <form method="post">
                <div className="form-group">
                    
                    <label>Project Title</label>
                    <input className="form-control required" defaultValue={project.title} type="text" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Project Description</label>
                    <input className="form-control required" defaultValue={project.title} type="text" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Project Color</label>
                    <select className="custom-select required" defaultValue={project.color} onChange={(e) => setColor(e.target.value)}>
                        <option selected="selected" disabled="disabled">Select a project color</option>
                        {
                            Object.keys(projectColor).map(key =>
                                <option value={key}>{key}</option>
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
