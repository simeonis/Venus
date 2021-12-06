import React, { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
import { ApiUrls } from "../../constants/ApiConstants";
import { Link, useHistory } from 'react-router-dom';
import { FaFolder, FaPlus, FaTrash, FaPen, FaFolderPlus } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'


const Home = () => {
    //states used to get and set properties
    const { user, projectList, getUser, getProjects } = useContext(AuthContext);
    // const [projectList, setProjectList] = useState([]);
    const [alert, setAlert] = useState(false);
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const elementsRef = useRef([]);
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
        borderWidth: 1,
        borderColor: projColor,

    });


    const highlightProj = (ind, color) => {
        /* var currentColor = ""
        switch (color) {
            case "#ff0000":
                currentColor = "rgba(255, 0, 0, 0.8)";
            case "#0000ff":
                currentColor = "rgba(0, 0, 255, 0.8)";
            case "#009933":
                currentColor = "rgba(0, 153, 51, 0.8)";
            case "#ffff00":
                currentColor = "rgba(255, 255, 0, 0.8)";
            case "#ff6600":
                currentColor = "rgba(153, 0, 204, 0.8)";
            case "#9900cc": 
                currentColor = "rgba(255, 102, 0, 0.8)";
            default:
                currentColor = "#fff"
     
        }*/
        if (elementsRef.current[ind] != null) {
            elementsRef.current[ind].style.borderColor = "black"
            elementsRef.current[ind].style.backgroundColor = `${color}`
        } 

    }
    const unHighlightProj = (ind, color) => {
        if (elementsRef.current[ind] != null) {
            elementsRef.current[ind].style.borderColor = `${color}`
            elementsRef.current[ind].style.backgroundColor = "initial"
        }

    }


    /* const changeId = (title, id) => {
         var proj = document.getElementById(id);
         proj.id = title;
     }*/

    //function to show/hide the delete alert
    const showAlert = (ind, title) => {
        setId(ind)
        setTitle(title)
        setAlert(!alert)

    }
    const divClick = (projectID) => {
        history.push({
            pathname: "/project-dashboard",
            query: projectID
        })
    }


    //submission handler for delete project functionality
    const handleSubmit = (e) => {
        e.preventDefault()
        deleteProject(id)
        //window.location.reload();
    }

    //Hook to load user and projects after rendering
    useEffect(() => {
        getUser();
        getProjects()
    }, [])

    return (
        <div className="overflow-hidden">
            <div className="d-flex justify-content-end m-15 float-group-bottom">
                <Link className="btn btn-square btn-primary rounded-circle mx-5 shadow center text-white cust-lg-btn" to="/createbug"><FaPlus size={50} /></Link>
            </div>
            <div className="p-20">
                {
                    user ? <h3>Welcome, {user.userName}</h3> : null
                }
            </div>
            <div className="h100 overflow-hidden grid-container">
                {alert && <div className="alert alert-danger row card col-6 offset-3 alert-fixed" id="deleteAlert">
                    <button className="close" data-dismiss="alert" type="button" aria-label="Close" onClick={(e) => { showAlert(e) }} ><IoIosCloseCircle />  </button>

                    <div className="col-9">
                        <h6>Are you sure you want to delete the project {title}</h6>
                    </div>
                    <div className="col-3">
                        <div className="row">
                            <button className="btn btn-primary m-5" onClick={(e) => {  showAlert(e) }}>No Cancel</button>
                        </div>
                        <div className="row">
                            <button className="btn btn-danger m-5 del" onClick={(e) => {
                                e.stopPropagation();
                                deleteProject(id)
                            }}>Yes Delete</button>
                        </div>
                    </div>
                </div>}
                {
                    projectList !== null ? (
                        projectList.map((project, index, array) => {
                            var newId = ("a" + project.id).slice(0, 7)
                            /* var count = index % 2;
                            if (count == 0) {
                                count = 1
                            } else {
                                count = 2
                            }*/

                            return <div className="card item project-card"
                                style={{ zIndex: 1 }}
                                ref={el => (elementsRef.current = [...elementsRef.current, el])}
                                id={{ newId }} style={cardStyles(projectColor(project.color))}
                                onMouseEnter={() =>
                                    highlightProj(index, projectColor(project.color))
                                }
                                onMouseLeave={() =>
                                    unHighlightProj(index, projectColor(project.color))
                                }
                                onClick={() =>
                                    divClick(project.id)}>
                                <div className="row">
                                    <div className="col-9 p-10" style={{ borderColor: projectColor(project.color) }}>
                                        <FaFolder className="" size={40} />
                                        <h3 className="font-weight-bold">{project.title}</h3>
                                        <h7>{project.description}</h7>
                                    </div>
                                    <div className="col-3 text-right">
                                        <div className="row">
                                            <Link className="btn btn-secondary m-10 text-white" to={{
                                                pathname: `/modifyproject`,
                                                query: project.id,
                                            }} style={{ zIndex: 0 }}
                                                onClick={(e) => { e.stopPropagation(); }}
                                            ><FaPen/>
                                                
                                            </Link>                                    
                                            <button style={{ zIndex: 0 }} className="btn btn-danger m-10 text-white" onClick={(e) => { e.stopPropagation(); showAlert(project.id, project.title) }} ><FaTrash/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    ) : null

                }
            </div>
        </div>
    )
}

export default Home