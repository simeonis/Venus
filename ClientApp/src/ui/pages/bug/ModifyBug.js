import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { BugEnums } from "../../../constants/BugConstants"
import { ApiUrls } from "../../../constants/ApiConstants"

export const ModifyBug = () => {
    // Enums
    const bugSeverity = BugEnums.severity
    const bugCategory = BugEnums.category

    // I/O
    const [bugID, setBugID] = useState("")
    const [projectID, setProjectID] = useState("")
    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")
    const [severity, setSeverity] = useState(bugSeverity.Medium)
    const [category, setCategory] = useState(bugCategory.None)

    // Navigation
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        const bug = location.state
        setBugID(bug.id)
        setProjectID(bug.projectID)
        setSubject(bug.subject)
        setSeverity(bug.severity)
        setCategory(bug.category)
    }, [])

    // Live Error Checking of "Subject" field
    useEffect(() => {
        setSubjectError(validSubject() ? "" : "Field cannot be empty")
    }, [subject])

    const validSubject = () => {
        return subject.length > 0 && subject.length <= 50
    }

    const modifyBug = () => {
        const args = [
            { "op": "replace", "path": "/subject", "value": `${subject}` },
            { "op": "replace", "path": "/severity", "value": `${severity}` },
            { "op": "replace", "path": "/category", "value": `${category}` }
        ]
        axios.patch(`${ApiUrls.bug}/${bugID}`, args)
            .then(response => {
                if (response.status === 200) {
                    history.push({
                        pathname: '/project-bugs',
                        query: projectID
                    })
                }
            })
            .catch(error => {
                console.error('There was an error!', error.response);
            })
    }

    const handleSubmit = (e) => {
        // Prevents Form from submitting
        e.preventDefault()
        if (validSubject()) {
            modifyBug()
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Modify Bug</h1>
            <button className="btn btn-primary float-group-tr" onClick={(e) => history.push({
                pathname: '/project-bugs',
                query: projectID
            })}>Back</button>
            <form className="w-400 mw-full">
                <div className="form-group">
                    <label>Bug Subject</label>
                    <input type="text" className="form-control" placeholder="Subject" required="required" minLength="0" maxLength="50" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    {!validSubject() ? < p className="text-danger font-size-12">{subjectError}</p> : null}
                </div>

                <div className="form-group">
                    <label>Bug Severity</label>
                    <select className="form-control" value={severity} onChange={(e) => setSeverity(e.target.value)}>
                        <option selected="selected" disabled="disabled">Select bug severity</option>
                        {
                            Object.keys(bugSeverity).map(key =>
                                <option value={key}>{key}</option>
                            )
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Bug Category</label>
                    <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option selected="selected" disabled="disabled">Select bug category</option>
                        {
                            Object.keys(bugCategory).map(key =>
                                <option value={key}>{key}</option>
                            )
                        }
                    </select>
                </div>

                <div className="text-center panel-body">
                    <input className="btn btn-primary w-half" type="submit" value="Modify" disabled={!validSubject()} onClick={(e) => handleSubmit(e)} />
                </div>
            </form>
        </div>
    )
}