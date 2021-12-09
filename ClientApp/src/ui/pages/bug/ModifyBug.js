import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { BugEnums } from "../../../constants/BugConstants"
import { ApiUrls } from "../../../constants/ApiConstants"

export const ModifyBug = () => {
    // Enums
    const bugSeverity = BugEnums.severity
    const bugCategory = BugEnums.category

    // TO-DO
    // const [error, setError] = useState();
    const [bug, setBug] = useState({})
    const [subject, setSubject] = useState("")
    const [severity, setSeverity] = useState(bugSeverity.Medium)
    const [category, setCategory] = useState(bugCategory.None)

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        const bug = location.state
        setBug(bug)
        setSubject(bug.subject)
        setSeverity(bug.severity)
        setCategory(bug.category)
    }, [])

    const modifyBug = () => {
        const args = [
            { "op": "replace", "path": "/subject", "value": `${subject}` },
            { "op": "replace", "path": "/severity", "value": `${severity}` },
            { "op": "replace", "path": "/category", "value": `${category}` }
        ]
        axios.patch(`${ApiUrls.bug}/${bug.id}`, args)
            .then(response => {
                if (response.status === 200) {
                    history.push({
                        pathname: '/project-bugs',
                        query: bug.projectID
                    })
                }
            })
            .catch(error => {
                console.error('There was an error!', error.response);
            })
    }

    const handleSubmit = (e) => {
        // Prevents From from submitting
        e.preventDefault()
        modifyBug()
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Modify Bug</h1>
            <form className="w-400 mw-full">
                <div className="form-group">
                    <label>Bug Subject</label>
                    <input type="text" className="form-control" placeholder="Subject" required="required" value={subject} onChange={(e) => setSubject(e.target.value)} />
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

                <input className="btn btn-primary" type="submit" value="Modify" onClick={(e) => handleSubmit(e)} />
            </form>
        </div>
    )
}