import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BugEnums } from "../../../constants/BugConstants"
import { ApiUrls } from "../../../constants/ApiConstants"
import { SyncLoader } from "react-spinners"
import { FaPlus, FaTrash, FaPen } from 'react-icons/fa';

export const BugList = () => {
    // Enums
    const bugSeverity = BugEnums.severity
    const bugCategory = BugEnums.category
    const bugStatus = BugEnums.status

    // TO-DO
    // const [error, setError] = useState();
    let  loading = true
    const [showLoading, setShowLoading] = useState(false)
    const [bugList, setBugList] = useState([])
    const [selectedAll, setSelectedAll] = useState(false)
    const [selectedList, setSelectedList] = useState([])
    const [canDelete, setCanDelete] = useState(false)
    const [canModify, setCanModify] = useState(false)

    useEffect(() => {
        setTimeout(() => { if (loading) { setShowLoading(true) } }, 100)
        getBugs()
    }, [])

    // START Web API Calls
    // Get All
    const getBugs = () => {
        console.log("Get called")
        axios.get(ApiUrls.bug)
            .then(response => {
                if (response.status === 200) {
                    setBugList(response.data)
                    setSelectedList(new Array(response.data.length).fill(false))
                    setSelectedAll(false)
                    loading = false
                    setShowLoading(false)
                }
            })
            .catch(error => {
                console.error('There was an error!', error.response);
            })
    }

    // Delete All (used to delete single instances aswell)
    const delBug = () => {
        const delList = findSelectedBugs()

        // Delete multiple bugs at once bugs at once
        axios.delete(ApiUrls.bug, { data: delList } )
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    getBugs() // Refresh UI
                }
            })
            .catch(error => {
                console.error('There was an error!', error.response);
            })
    }
    // END Web API Calls

    const findSelectedBugs = () => {
        return selectedList.map((item, index) => item ? bugList[index] : null).filter(item => item)
    }

    const handleCheckbox = (e, position) => {
        if (position == -1) {
            setSelectedAll(!selectedAll)
            const updatedCheckedState = new Array(selectedList.length).fill(!selectedAll)
            setSelectedList(updatedCheckedState)
            setCanDelete(!selectedAll)
            setCanModify(false)
        } else {
            let trueCount = 0
            const updatedCheckedState = selectedList.map((item, index) =>
                {
                    const result = index === position ? !item : item
                    trueCount += result ? 1 : 0
                    return result
                }
            )
            setSelectedList(updatedCheckedState)
            setCanDelete(trueCount > 0)
            setCanModify(trueCount === 1)
        }
    }

    const severityColor = (severity) => {
        switch (severity) {
            case "High":
                return "#ff4d4f"
            case "Medium":
                return "#ffcf00"
            case "Low":
                return "#30b35a"
            default:
                return "#fff"
        }
    }

    const categoryColor = (category) => {
        switch (category) {
            case "Functional":
                return "#05299E"
            case "Performance":
                return "#5E4AE3"
            case "Usability":
                return "#947BD3"
            case "Compatibility":
                return "#F0A7A0"
            case "Security":
                return "#F26CA7"
            default:
                return "#FFF"
        }
    }

    const dateFormatter = (date) => {
        let jsDate = new Date(date)
        return `${jsDate.toLocaleString('en-GB').split(',')[0]}`
    }

    return (
        <div>
            <div className="d-flex justify-content-end m-15">
                <button className="center btn btn-square btn-primary rounded-circle mx-5"><FaPlus /></button>
                <button className="center btn btn-square btn-secondary rounded-circle mx-5 text-white" disabled={!canModify}><FaPen /></button>
                <button className="center btn btn-square btn-danger rounded-circle mx-5" disabled={!canDelete} onClick={(e) => delBug()}><FaTrash /></button>
            </div>
                <div className="d-flex flex-column align-items-center mx-20 px-20">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="min">
                                    <div className="custom-checkbox">
                                        <input type="checkbox" id="all" value="" checked={selectedAll} onChange={(e) => handleCheckbox(e, -1)} />
                                        <label htmlFor="all"></label>
                                    </div>
                                </th>
                                <th className="min">Category</th>
                                <th className="max">Subject</th>
                                <th className="min">Creator</th>
                                <th className="min">Severity</th>
                                <th className="min">Status</th>
                                <th className="min">Assignee</th>
                                <th className="min">Created</th>
                            </tr>
                        </thead>
                        {showLoading ?
                            <div className="loaderWrap">
                                <SyncLoader size={25} color={"#252627"} />
                            </div>
                            :
                            <tbody>
                                {
                                    bugList.map((bug, i) =>
                                        <tr key={i}>
                                            <td className="min">
                                                <div className="custom-checkbox">
                                                    <input type="checkbox" id={i} value="" checked={selectedList[i]} onChange={(e) => handleCheckbox(e, i)} />
                                                    <label htmlFor={i}></label>
                                                </div>
                                            </td>
                                            <td className="min">
                                                {
                                                    bug.category != "None" ?
                                                        <span
                                                            style={{ backgroundColor: categoryColor(bug.category) }}
                                                            className="badge">{bug.category}
                                                        </span> : null
                                                }
                                            </td>
                                            <td className="max">{bug.details}</td>
                                            <td className="min">John Doe</td>
                                            <td className="min">
                                                <span
                                                    style={{ backgroundColor: severityColor(bug.severity) }}
                                                    className={"badge severity"}>
                                                    {bug.severity}
                                                </span>
                                            </td>
                                            <td className="min">
                                                <select className="form-control form-control-sm status" defaultValue={bug.status}>
                                                    {
                                                        Object.keys(bugStatus).map((key, i) =>
                                                            <option key={i} value={key}>{bugStatus[key]}</option>
                                                        )
                                                    }
                                                </select>
                                            </td>
                                            <td className="min">John Doe</td>
                                            <td className="min">{dateFormatter(bug.date)}</td>
                                        </tr>
                                    )
                                }
                            </tbody>}
                    </table>
                </div>
        </div>
    )
}