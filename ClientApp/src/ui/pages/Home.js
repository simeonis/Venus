import React, { useContext, useEffect, useState, useRef, componentWillMount } from 'react'
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
import { ApiUrls } from "../../constants/ApiConstants";
import { Link, useHistory } from 'react-router-dom';
import {FaRegFolder, FaFolder, FaTrash, FaPen, FaPlus, FaFolderOpen} from 'react-icons/fa'


const Home = () => {
    //states used to get and set properties
    const { user, projectList, getUser, getProjects } = useContext(AuthContext);
    const [alert, setAlert] = useState(false);
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    
    const elementsRef = useRef([]);
    const openFolderRef = useRef([]);
    const closeFolderRef = useRef([]);
    const history = useHistory()

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
    }

    const cardStyles = (projColor) => ({
        outline: `solid 1px transparent`,
        borderColor: projColor,
        borderWidth: "1px"

    });
    
    const highlightProj = (ind, color, id) => {
        if (elementsRef.current[ind] != null && openFolderRef.current[ind] != null && closeFolderRef.current[ind] != null) {
            if (elementsRef.current[ind] != null) {
                elementsRef.current[ind].style.outline = `solid 3px ${color}`
            }
            if (openFolderRef.current[ind] != null) {
                openFolderRef.current[ind].style.display = "inline"
            }
            if (closeFolderRef.current[ind] != null) {
                closeFolderRef.current[ind].style.display = "none"
            }
        } else {

        }
        
    }
    const unHighlightProj = (ind, color) => {
        if (elementsRef.current[ind] != null) {
            elementsRef.current[ind].style.outline = `${color}`
        }
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

    //Hook to load user and projects after rendering
    useEffect(() => {
        getUser();
        getProjects();
    }, [])

    return (
        <div className="overflow-hidden" >
            {alert && <div className="alert alert-default row col-4  alert-fixed" id="deleteAlert" >
                <div className="col-9">
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
            <div className="m-20 mb-0 p-10">
                {
                    user ? <h3>Welcome, {user.userName}</h3> : null
                }
            </div>
            <div className="h100 overflow-hidden grid-container m-20 mt-0 p-10">
                <div className="d-flex justify-content-end m-15 float-group-bottom">
                    <Link className="btn btn-square btn-primary rounded-circle mx-5 shadow center text-white cust-lg-btn" to="/createproject"><FaPlus size={30} /></Link>
                </div>
                {
                    projectList.length === 0 ? (
                        <h4>No projects available</h4>
                        ) :(
                    projectList.map((project, index) => {
                    return <div size={1000} className="folder-card" style={{ color: projectColor(project.color), zIndex: 0}}
                        ref={el => (elementsRef.current = [...elementsRef.current, el])}
                        style={cardStyles(projectColor(project.color))}
                        onMouseEnter={() =>
                            highlightProj(index, projectColor(project.color), project.id)
                        }
                        onMouseLeave={() =>
                            unHighlightProj(index, projectColor(project.color))
                        }
                        onClick={() =>
                            divClick(project.id)}>
                        <div className="d-flex justify-content-end m-15">
                            <Link className="btn btn-square btn-secondary rounded-circle mx-5 text-white shadow center text-white" to={{
                                pathname: `/modifyproject`,
                                query: {
                                    pId: project.id,
                                    pTitle: project.title,
                                    pDesc: project.description,
                                    pColor: project.color
                                },
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
                                <h7>{project.description}</h7>
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