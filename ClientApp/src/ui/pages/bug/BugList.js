import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ApiUrls } from "../../../constants/ApiConstants";

export const BugList = () => {
    // TO-DO
    // const [error, setError] = useState();
    const [bugList, setBugList] = useState([]);

    const getBugs = () => {
        console.log("Getting bugs...")
        axios.get(ApiUrls.bug)
            .then(response => {
                if (response !== null) {
                    console.log("RESP " + JSON.stringify(response.data))
                    setBugList(response.data)
                }
            })
            .catch(error => {
                // setError(error.response);
                console.error('There was an error!', error.response);
            });
    }

    useEffect(() => {
        console.log("Bug List Page Loaded.")
        getBugs()
    }, [])

    return (
        <div>
            <h1>Bug List Page</h1>
            {
                bugList.map(bug =>
                    <div>
                        <h3>{bug.title}</h3>
                        <p>{bug.title}</p>
                        <p>{bug.details}</p>
                        <p>{bug.status}</p>
                    </div>
                )
            }
        </div>
    )
}