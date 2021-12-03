import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { BugEnums } from "../../../constants/BugConstants"
import { ApiUrls } from "../../../constants/ApiConstants"

export const CreateBug = () => {
    // Enums
    const bugSeverity = BugEnums.severity
    const bugCategory = BugEnums.category
    const bugStatus = BugEnums.status

    // TO-DO
    // const [error, setError] = useState();
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
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
            title: title,
            details: details,
            severity: severity,
            category: category,
            status: bugStatus.Unassigned,
            date: new Date().toJSON()
        }

        addBug(bugDto)
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>Create Bug</h1>
            <form className="w-400 mw-full">
                {/* <!-- Input --> */}
                <div className="form-group">
                    {/*<p className="text-danger">{emailError}</p>*/}
                    <label className="required">Bug Title</label>
                    <input type="text" className="form-control" placeholder="Title" required="required" onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="form-group">
                    {/*<p className="text-danger">{passwordError}</p>*/}
                    <label className="required">Bug Details</label>
                    <input type="text" className="form-control" placeholder="Details" onChange={(e) => setDetails(e.target.value)} />
                </div>

                <div className="form-group">
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