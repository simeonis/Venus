import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { BugEnums } from "../../../constants/BugConstants"
import { ApiUrls } from "../../../constants/ApiConstants"

// Needed to Patch Bug
/*[
    {
        "op": "replace",
        "path": "/title",
        "value": "Bug #1"
    },
    {
        "op": "replace",
        "path": "/details",
        "value": "abc"
    }
]*/

export const ModifyBug = () => {
    // Enums
    const bugSeverity = BugEnums.severity
    const bugCategory = BugEnums.category
    const bugStatus = BugEnums.status
    const bugAssignee = BugEnums.assignee

    // TO-DO
    // const [error, setError] = useState();
    const [subject, setSubject] = useState("")
    const [severity, setSeverity] = useState(bugSeverity.Medium)
    const [category, setCategory] = useState(bugCategory.None)

    const history = useHistory()

    const addBug = (bugDto) => {
        axios.post(ApiUrls.bug, bugDto)
            .then(response => {
                if (response !== null) {
                    console.log("RESP " + JSON.stringify(response.data))
                    // Go back to bug list
                    history.push('/bugs')
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
            creator: "John Doe",
            severity: severity,
            status: bugStatus.NotStarted,
            assignee: bugAssignee.Unassigned,
            date: new Date().toJSON()
        }
        addBug(bugDto)
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Modify Bug</h1>
            <form className="w-400 mw-full">
                {/* <!-- Input --> */}
                <div className="form-group">
                    <label>Bug Subject</label>
                    <input type="text" className="form-control" placeholder="Subject" required="required" onChange={(e) => setSubject(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Bug Severity</label>
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
                    <label>Bug Category</label>
                    <select className="form-control" onChange={(e) => setCategory(e.target.value)}>
                        <option selected="selected" disabled="disabled">Select bug category</option>
                        {
                            Object.keys(bugCategory).map(key =>
                                <option value={key}>{key}</option>
                            )
                        }
                    </select>
                </div>

                {/* <!-- Submit button --> */}
                <input className="btn btn-primary" type="submit" value="Create" onClick={(e) => handleSubmit(e)} />
            </form>
        </div>
    )
}