import React, {useContext, useState, useEffect} from 'react'
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

    // I/O
    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")
    const [severity, setSeverity] = useState(bugSeverity.Medium)
    const [category, setCategory] = useState(bugCategory.None)

    // Navigation
    const history = useHistory()
    const location = useLocation()

    // Utilities
    const { user } = useContext(AuthContext)

    // Live Error Checking of "Subject" field
    useEffect(() => {
        setSubjectError(validSubject() ? "" : "Field cannot be empty")
    }, [subject])

    const validSubject = () => {
        return subject.length > 0 && subject.length <= 50
    }

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
                <div className="form-group">
                    <label className="required">Bug Subject</label>
                    <input type="text" className="form-control" placeholder="Subject" required="required" minLength="0" maxLength="50" onChange={(e) => setSubject(e.target.value)} />
                    {!validSubject() ? < p className="text-danger font-size-12">{subjectError}</p> : null}
                </div>

                <div className="form-group">
                    <label className="required">Bug Severity</label>
                    <select className="form-control" onChange={(e) => setSeverity(e.target.value)}>
                        <option selected="selected" disabled="disabled">Select bug severity</option>
                        {
                            Object.keys(bugSeverity).map((key, i) =>
                                <option key={i} value={key}>{key}</option>
                            )
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label className="required">Bug Category</label>
                    <select className="form-control" onChange={(e) => setCategory(e.target.value)}>
                        <option selected="selected" disabled="disabled">Select bug category</option>
                        {
                            Object.keys(bugCategory).map((key, i) =>
                                <option key={i} value={key}>{key}</option>
                            )
                        }
                    </select>
                </div>

                <input className="btn btn-primary" type="submit" value="Create" disabled={!validSubject()} onClick={(e) => handleSubmit(e)} />
            </form>
        </div>
    )
}