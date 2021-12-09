import React, { useContext, useEffect, useState, useRef, componentWillMount } from 'react'
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
import { ApiUrls } from "../../constants/ApiConstants";
import { Link, useHistory } from 'react-router-dom';
import {FaRegFolder, FaFolder, FaTrash, FaPen, FaPlus} from 'react-icons/fa'
/*import { IconContext } from 'react-icons'
import { FolderIcon } from '@mui/icons-material';*/


const Home = () => {
    //states used to get and set properties
    const { user, projectList, getUser, getProjects } = useContext(AuthContext);
    const [alert, setAlert] = useState(false);
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [openFolder, setOpenFolder] = useState(false);
    const [closeFolder, setCloseFolder] = useState(false);
    const [refState, setRefState] = useState({})

    const [show, setShow] = useState(false);
    
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
                //elementsRef.current[ind].style.backgroundColor = `${color}`
            }
            if (openFolderRef.current[ind] != null) {
                openFolderRef.current[ind].style.display = "inline"
            }
            if (closeFolderRef.current[ind] != null) {
                closeFolderRef.current[ind].style.display = "none"
            }
        } else {
            //if null reload?

        }
        
    }
    const unHighlightProj = (ind, color) => {
        if (elementsRef.current[ind] != null) {
            elementsRef.current[ind].style.outline = `${color}`
            //setCloseFolder(false)
            //setOpenFolder(true)
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

    //submission handler for delete project functionality
    const handleSubmit = (e) => {
        e.preventDefault()
        deleteProject(id)
        //window.location.reload(false);
    }

    const countProjects = () => {
        var countProj;
        for (var proj in projectList) {
            countProj++
        }
        return countProj


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
            <div className="">
                {
                    user ? <h3>Welcome, {user.userName}</h3> : null
                }

            </div>
            
            <div className="h100 overflow-hidden grid-container ">
                <div className="d-flex justify-content-end m-15 float-group-bottom">
                    <Link className="btn btn-square btn-primary rounded-circle mx-5 shadow center text-white cust-lg-btn" to="/createproject"><FaPlus size={50} /></Link>
                </div>
                {
                    projectList.length === 0 ? (
                        <div><h4>No projects available.</h4></div>
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
                        <div className="row">
                            <div className="col-10 p-10">

                                <h4 className="font-weight-bold">
                                    <span ref={el => (openFolderRef.current = [...openFolderRef.current, el])} className="folder-open">
                                        < FaRegFolder className="folder-icon" size={75} />
                                    </span>
                                    <span ref={el => (closeFolderRef.current = [...closeFolderRef.current, el])} className="folder-close">
                                        < FaFolder className="folder-icon" size={75} />
                                    </span>
                                    {project.title}</h4>
                                <h7>{project.description}</h7>
                            </div>
                            <div className="col-2">
                                <div className="row folder-buttons">
                                    <Link className="btn btn-secondary m-10 text-white" to={{
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
                                    <button style={{ zIndex: 1 }} className="btn btn-danger m-10 text-white" onClick={(e) => { e.stopPropagation(); showAlert(project.id, project.title) }} ><FaTrash /></button>
                                </div>
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