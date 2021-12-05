import React from 'react'
import { BugEnums } from "../../../constants/BugConstants"
import { SyncLoader } from "react-spinners"

export const BugTable = ({ bugList, handleCheckbox, selectedAll, selectedList, showLoading, updateStatus }) => {
    const bugStatus = BugEnums.status

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

    const isBugSelected = (id) => {
        for (let i = 0; i < selectedList.length; i++) {
            if (selectedList[i].id === id) {
                return selectedList[i].selected
            }
        }

        return false
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th className="min">
                        <div className="custom-checkbox">
                            <input type="checkbox" id="all" value="" checked={selectedAll} onChange={(e) => handleCheckbox(e, null)} />
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
                <tbody>
                    <tr>
                        <td className='m-20 p-20 text-center align-middle' colSpan='100%'>
                            <SyncLoader size={20} color="#AAA" />
                        </td>
                    </tr>
                </tbody>
                :
                <tbody>
                    {
                        bugList.map((bug, i) =>
                            <tr key={i}>
                                <td className="min">
                                    <div className="custom-checkbox">
                                        <input type="checkbox" id={bug.id} value="" checked={isBugSelected(bug.id)} onChange={(e) => handleCheckbox(e, bug.id)} />
                                        <label htmlFor={bug.id}></label>
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
                                <td className="max">{bug.subject}</td>
                                <td className="min">{bug.creator}</td>
                                <td className="min">
                                    <span
                                        style={{ backgroundColor: severityColor(bug.severity) }}
                                        className={"badge severity"}>
                                        {bug.severity}
                                    </span>
                                </td>
                                <td className="min">
                                    <select className="form-control form-control-sm status" defaultValue={bug.status} onChange={(e) => updateStatus(bug.id, e.target.value)}>
                                        {
                                            Object.keys(bugStatus).map((key, i) =>
                                                <option key={i} value={bugStatus[key]}>{bugStatus[key]}</option>
                                            )
                                        }
                                    </select>
                                </td>
                                <td className="min">{bug.assignee}</td>
                                <td className="min">{dateFormatter(bug.date)}</td>
                            </tr>
                        )
                    }
                </tbody>}
        </table>
    )
}