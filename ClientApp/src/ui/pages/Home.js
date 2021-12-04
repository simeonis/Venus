import React, { Component, useEffect, useState } from 'react';
import axios from 'axios'
import { ApiUrls } from "../../constants/ApiConstants";

export class Home extends Component {
    static displayName = Home.name;




    /*const [projectList, setProjectList] = useState([]);
    const getProjects = () => {
        console.log("getting projects")
        axios.get(ApiUrls.project)
            .then(response => {
                if (response !== null) {
                    console.log("response : " + JSON.stringify(response.data)
                    setProjectList(response.data)
                }
            })
            .catch(error => {
                console.error('There was an error.', error.response)
            })
    }
    useEffect(() => {
        console.log("get projects effect")
        getProjects()
    });*/

  render () {
    return (
      <div className="">
            <h1>Home Page</h1>
           {/* {
                projectList.map(project =>
                    <div>
                        <h3>{project.title}</h3>
                        <p>{project.title}</p>
                        <p>{project.description}</p>
                        <p>{project.color}</p>
                    </div>
                )
            }*/}
            

      </div>
    );
  }
}


/*useEffect(() => {
    getProjects();
})*/
