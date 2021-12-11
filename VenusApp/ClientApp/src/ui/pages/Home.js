import React, { useContext, useState, useRef, useEffect } from 'react'
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
import { ApiUrls } from "../../constants/ApiConstants";
import { Link, useHistory } from 'react-router-dom';
import {FaFolder, FaTrash, FaPen, FaPlus, FaFolderOpen} from 'react-icons/fa'


const Home = () => {
    //states used to get and set properties
    const { user, projectList, getProjects } = useContext(AuthContext);
    const [alert, setAlert] = useState(false);
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [errorDelete, setErrorDelete] = useState("")
    
    const elementsRef = useRef([]);
    const openFolderRef = useRef([]);
    const closeFolderRef = useRef([]);
    const history = useHistory()

    useEffect(() => {
        getProjects()
    }, [])

    //switch to show colors in dropdown menu
    const projectColor = (color) => {
        switch (color) {
            case "Red":
                return "#9ecaed"
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

    //API request to delete the project selected
    const deleteProject = (id) => {
        axios.delete(ApiUrls.project + `/${id}`)
            .then(response => {
                if (response !== null) {
                    setAlert(!alert)
                    getProjects()
                    console.log("response : " + JSON.stringify(response.data))
                }
            })
            .catch(error =>{
                setErrorDelete(error.response.data);
            })
    }

    const cardClass = (projColor) => {
        switch (projColor) {
            case "Red":
                return "folder-red"
            case "Blue":
                return "folder-blue"
            case "Green":
                return "folder-green"
            case "Yellow":
                return "folder-yellow"
            case "Orange":
                return "folder-orange"
            case "Purple":
                return "folder-purple"
            default:
                return "folder-white"
        }
    }
    
    const highlightProj = (ind, color, id) => {
        if (openFolderRef.current[ind] != null) {
            openFolderRef.current[ind].style.display = "inline"
        }
        if (closeFolderRef.current[ind] != null) {
            closeFolderRef.current[ind].style.display = "none"
        }
    }

    const unHighlightProj = (ind, color) => {
        if (closeFolderRef.current[ind] != null) {
            closeFolderRef.current[ind].style.display = "inline"
        }
        if (openFolderRef.current[ind] != null) {
            openFolderRef.current[ind].style.display = "none"
        }
    }

    //function to show/hide the delete alert
    const showAlert = (ind, title) => {
        setId(ind)
        setTitle(title)
        setAlert(!alert)

    }
    const divClick = (projectID) => {
        history.push({
            pathname: `/project-dashboard`,
            query: projectID
        })
    }

    return (
        <div className="overflow-hidden" >
            {alert && <div className="alert alert-default row col-4  alert-fixed" id="deleteAlert" >
                <div className="col-9">
                    <p className="text-danger">{errorDelete}</p>
                    <h6>Are you sure you want to delete the project: {title}</h6>
                </div>
                <div className="col-3">
                    <div className="row">
                        <button className="btn btn-primary m-5" onClick={(e) => { showAlert(e) }}>Cancel</button>
                    </div>
                    <div className="row">
                        <button className="btn btn-danger m-5 del" onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(id)
                        }}>Delete</button>
                    </div>
                </div>
            </div>}
            <div className="m-0 mb-20 p-0">
                {
                    user ? <h3 className="mb-0">Welcome, {user.userName}</h3> : null
                }
            </div>
            <div className="overflow-hidden grid-container mb-20 mt-0 ml-0">
                <div className="d-flex justify-content-end m-15 float-group-bottom">
                    <Link className="btn btn-square btn-primary rounded-circle mx-5 shadow center text-white cust-lg-btn" to="/createproject"><FaPlus size={30} /></Link>
                </div>
                {
                    projectList.length === 0 ? (
                        <h4>No projects available</h4>
                    ) : (
                            projectList.map((project, index) => {
                                return <div key={index} size={1000} className={"m-0 card folder-card shadow " + cardClass(project.color)}
                                ref={el => (elementsRef.current = [...elementsRef.current, el])}
                        onMouseEnter={() =>
                            highlightProj(index, projectColor(project.color), project.id)
                        }
                        onMouseLeave={() =>
                            unHighlightProj(index, projectColor(project.color))
                        }
                        onClick={() =>
                            divClick(project.id)}>
                        <div className="d-flex justify-content-end m-15 folder-btn">
                            <Link className="btn btn-square btn-secondary rounded-circle mx-5 text-white shadow center text-white" to={{
                                pathname: `/modifyproject`,
                                state: project   
                            }} style={{ zIndex: 1 }}
                                onClick={(e) => { e.stopPropagation(); }}
                            ><FaPen />
                            </Link>
                            <button style={{ zIndex: 1 }} className="center btn btn-square btn-danger rounded-circle mx-5 text-white shadow" onClick={(e) => { e.stopPropagation(); showAlert(project.id, project.title) }} ><FaTrash /></button>
                        </div>
                        <div className="row">
                            <div className="col-8 p-10">
                                <h4 className="font-weight-bold">
                                    <span ref={el => (openFolderRef.current = [...openFolderRef.current, el])} className="folder-open">
                                        < FaFolderOpen className="folder-icon" size={75} />
                                    </span>
                                    <span ref={el => (closeFolderRef.current = [...closeFolderRef.current, el])} className="folder-close">
                                        < FaFolder className="folder-icon" size={75} />
                                    </span>
                                    {project.title}</h4>
                                <h6 className="text-break">{project.description}</h6>
                            </div>
                        </div>
                    </div>
                }))
                }
            </div>
        </div>
    )
}

export default Home