﻿import React, {useContext, useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { BugEnums } from "../../../constants/BugConstants"
import { ApiUrls } from "../../../constants/ApiConstants"
import {AuthContext} from "../../../context/AuthContext";

export const CreateBug = () => {
    // Enums
    const bugSeverity = BugEnums.severity
    const bugCategory = BugEnums.category
    const bugStatus = BugEnums.status

    // TO-DO
    // const [error, setError] = useState();
    const [subject, setSubject] = useState("")
    const [severity, setSeverity] = useState(bugSeverity.Medium)
    const [category, setCategory] = useState(bugCategory.None)

    const history = useHistory()
    const location = useLocation()
    
    const {user} = useContext(AuthContext)

    const addBug = (bugDto) => {
        console.log(bugDto)
        axios.post(ApiUrls.bug, bugDto)
            .then(response => {
                if (response !== null) {
                    console.log("RESP " + JSON.stringify(response.data))
                    // Go back to bug list
                    history.push({
                        pathname: '/project-bugs',
                        query: location.query
                    })
                }
            })
            .catch(error => {
                // setError(error.response);
                console.error('There was an error!', error.response);
            });
    }

    const handleSubmit = (e) => {
        // Prevents From from submitting
        e.preventDefault()

        // TO-DO Error Check
        const bugDto = {
            category: category,
            subject: subject,
            creator: user.userName,
            severity: severity,
            status: bugStatus.NotStarted,
            date: new Date().toJSON(),
            projectID: location.query
        }
        addBug(bugDto)
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Create Bug</h1>
            <form className="w-400 mw-full">
                {/* <!-- Input --> */}
                <div className="form-group">
                    <label className="required">Bug Subject</label>
                    <input type="text" className="form-control" placeholder="Subject" required="required" onChange={(e) => setSubject(e.target.value)} />
                </div>

                <div className="form-group">
                    <label className="required">Bug Severity</label>
                    <select className="form-control" onChange={(e) => setSeverity(e.target.value)}>
                        <option selected="selected" disabled="disabled">Select bug severity</option>
                        {
                            Object.keys(bugSeverity).map(key =>
                                <option value={key}>{key}</option>
                            )
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label className="required">Bug Category</label>
                    <select className="form-control" onChange={(e) => setCategory(e.target.value)}>
                        <option selected="selected" disabled="disabled">Select bug category</option>
                        {
                            Object.keys(bugCategory).map(key =>
                                <option value={key}>{key}</option>
                            )
                        }
                    </select>
                </div>

                <input className="btn btn-primary" type="submit" value="Create" onClick={(e) => handleSubmit(e)} />
            </form>
        </div>
    )
}