import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
import { ApiUrls } from "../../constants/ApiConstants";
import { Link } from 'react-router-dom';
import { FaFolder } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'




const Auth = () => {
    //states used to get and set properties
    const { user, getUser } = useContext(AuthContext);
    const [projectList, setProjectList] = useState([]);
    const [counter, setCounter] = useState(0);
    const [alert, setAlert] = useState(false);
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")



    //switch to show colors in dropdown menu
    const projectColor = (color) => {
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


    //API request to get list of projects
    const getProjects = () => {
        console.log("getting projects")
        axios.get(ApiUrls.project)
            .then(response => {
                if (response !== null) {
                    console.log("response : " + JSON.stringify(response.data))
                    setProjectList(response.data)
                }
            })
            .catch(error => {
                console.error('There was an error.', error.response)
            })
    }

    //API request to delete the project selected
    const deleteProject = (id) => {
        axios.delete(ApiUrls.project + `/${id}`)
            .then(response => {
                if (response !== null) {
                    console.log("response : " + JSON.stringify(response.data))
                }
            })

    }

    //function to show/hide the delete alert
    const showAlert = (ind, title) => {
        setId(ind)
        setTitle(title)
        setAlert(!alert)
    }


    //submission handler for delete project functionality
    const handleSubmit = (e) => {
        e.preventDefault()
        deleteProject(id)
        window.location.reload();
    }

    //Hook to load user and projects after rendering
    useEffect(() => {
        getUser();
        getProjects()
    }, [])

    return (
        <div>
            <div className="p-20">
                <h1>Your Projects (Auth!)</h1>
                {
                    user ? <p>Welcome, {user.name}</p> : null
                }
            </div>
            <div className="container-fluid">
                {alert && <div className="alert alert-danger row card col-6 offset-3 alert-fixed" id="deleteAlert">
                    <button className="close" data-dismiss="alert" type="button" aria-label="Close" onClick={(e) => { showAlert(e) }} ><IoIosCloseCircle />  </button>

                    <div className="col-9">
                        <h6>Are you sure you want to delete the project {title}</h6>
                    </div>
                    <div className="col-3">
                        <div className="row">
                            <button className="btn btn-primary m-5" onClick={(e) => { showAlert(e) }}>No Cancel</button>
                        </div><div className="row">
                            <button className="btn btn-danger m-5" onClick={(e) => { handleSubmit(e) }}>Yes Delete</button>
                        </div>
                    </div>
                </div>}
                {

                    projectList.map((project, index, array) => {

                        return <div className="row">
                            <div className="row card col-6 offset-3" style={{ borderColor: projectColor(project.color) }}>
                                <div className=" col-9" style={{ borderColor: projectColor(project.color) }}>
                                    <FaFolder className="fa-lg" />
                                    <h3 className="">{project.title}</h3>
                                    <h7>{project.description}</h7>
                                </div>
                                <div className=" col-3">
                                    <div className="row">
                                        <Link className="btn btn-primary m-10" to={{
                                            pathname: `/projectdetails`,
                                            query: project.id
                                        }}>Details</Link>
                                    </div>
                                    <div className="row">
                                        <Link className="btn btn-secondary m-10" to={{
                                            pathname: `/modifyproject`,
                                            query: project.id,
                                        }}>Modify</Link>
                                    </div>
                                    <div className="row">
                                        <input type="button" className="btn btn-danger m-10" onClick={(e) => { showAlert(project.id, project.title) }} value="Delete" />
                                    </div>
                                </div>


                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Auth