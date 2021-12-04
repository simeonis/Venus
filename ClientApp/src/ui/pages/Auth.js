import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
import { ApiUrls } from "../../constants/ApiConstants";
import { Link } from 'react-router-dom';



const Auth = () => {
    const { user, getUser } = useContext(AuthContext);
    const [projectList, setProjectList] = useState([]);

    

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

    const deleteProject = (id) => {
        axios.delete(ApiUrls.project + `/${id}`)
            .then(response => {
                if (response !== null) {
                    console.log("response : " + JSON.stringify(response.data))
                }
            })

    }

    const handleSubmit = (e, id) => {
        e.preventDefault()
        deleteProject(id)
    }

    useEffect(()=>{
        getUser();
        getProjects()
    }, [])

    return (
        <div>
            <script></script>
            <h1>Auth!</h1>
            {
                user ? <div>{user.name}</div> : null
            }
            {
                projectList.map(project =>
     
                    <div class="card">
                            <div className="card-body">
                                <h5 className="card-title">{project.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{project.description}</h6>
                            <h6>{project.color}</h6>
                            {/*<Link className="btn btn-primary m-10"to="/projectdetails">Details</Link>*/}
                            <Link className="btn btn-primary m-10" to={{
                                pathname: `/modifyproject`,
                                query: project.id,

                                

                            }}>Modify</Link>
                            <input type="button" className="btn btn-primary m-10" onClick={(e) => { handleSubmit(e, project.id) }} value="Delete"/>
                            </div>
                       
                    </div>
                )
            }
        </div>
    )
}

export default Auth