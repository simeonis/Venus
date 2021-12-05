import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ApiUrls } from '../../../constants/ApiConstants'
import { FaPlus, FaTrash, FaPen } from 'react-icons/fa'
import { BugTable } from '../../components/tables/BugTable'
import { BugEnums } from "../../../constants/BugConstants"
import { CreateBug } from './CreateBug';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Modal } from '../../components/modal/Modal'

export const BugList = () => {
    // Loading
    let  loading = true
    const [showLoading, setShowLoading] = useState(false)

    // User Lists
    const [userBugList, setUserBugList] = useState([])
    const [generalBugList, setGeneralBugList] = useState([])

    // Selectables
    const [selectedList, setSelectedList] = useState({})
    const [selectedAll, setSelectedAll] = useState(false)

    // Buttons
    const [canDelete, setCanDelete] = useState(false)
    const [canModify, setCanModify] = useState(false)

    useEffect(() => {
        setTimeout(() => { if (loading) { setShowLoading(true) } }, 100)
        getBugs()
    }, [])

    useEffect(() => {
        const filteredList = generalBugList.map(bug => bug.severity === BugEnums.severity.High ? bug : null).filter(item => item)
        setUserBugList(filteredList)
    }, [generalBugList])

    // START Web API Calls
    // Get All
    const getBugs = () => {
        axios.get(ApiUrls.bug)
            .then(response => {
                if (response.status === 200) {
                    setGeneralBugList(response.data)
                    setSelectedList(response.data.map(bug => { return { id: bug.id, selected: false } }))
                    setSelectedAll(false)
                    setShowLoading(loading = false)
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
        if (delList.length > 0) {
            axios.delete(ApiUrls.bug, { data: delList })
                .then(response => {
                    if (response.status === 200) {
                        getBugs() // Refresh UI
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error.response);
                })
        }
    }

    // Patch Status
    const updateStatus = (id, status) => {
        const args = [{ "op": "replace", "path": "/status", "value": `${status}` }]
        axios.patch(`${ApiUrls.bug}/${id}`, args)
            .then(response => {
                if (response.status === 200) {
                    const copy = generalBugList
                    copy.find(bug => bug.id === id).status = status
                    // Sync Lists By Refreshing their UI
                    setGeneralBugList([])
                    setGeneralBugList(copy)
                }
            })
            .catch(error => {
                console.error('There was an error!', error.response);
            })
    }
    // END Web API Calls

    const findSelectedBugs = () => {
        return selectedList.map((bug, index) => bug.selected ? generalBugList[index] : null).filter(item => item)
    }

    const handleCheckbox = (e, id) => {
        if (id === null) {
            setSelectedAll(!selectedAll)
            setSelectedList(generalBugList.map(bug => { return { id: bug.id, selected: !selectedAll } }))
            setCanDelete(!selectedAll)
            setCanModify(false)
        } else {
            let trueCount = 0
            setSelectedList(selectedList.map(bug => {
                    if (bug.id === id) bug.selected = !bug.selected
                    trueCount += bug.selected ? 1 : 0
                    return bug
                }
            ))
            setCanDelete(trueCount > 0)
            setCanModify(trueCount === 1)
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-end m-15 float-group">
                <Link className="btn btn-square btn-primary rounded-circle mx-5 shadow center text-white" to="/createbug"><FaPlus /></Link>
                {
                    canModify ? <Link className="btn btn-square btn-secondary rounded-circle mx-5 text-white shadow center text-white" to="/modifybug"><FaPen /></Link>
                        : <Link className="btn btn-square btn-secondary rounded-circle mx-5 text-white shadow center text-white disabled" onClick={(e) => e.preventDefault()}><FaPen /></Link>
                }
                <button className="center btn btn-square btn-danger rounded-circle mx-5 text-white shadow" disabled={!canDelete} onClick={(e) => delBug()}><FaTrash /></button>
            </div>
            <div className="d-flex flex-column align-items-start mx-20 px-20">
                <details className="collapse-panel w-lg-full m-15" open>
                    <summary className="collapse-header">
                        My Bugs
                    </summary>
                    <div className="collapse-content">
                        <BugTable
                            bugList={userBugList}
                            handleCheckbox={handleCheckbox}
                            selectedAll={selectedAll}
                            selectedList={selectedList}
                            showLoading={showLoading}
                            updateStatus={updateStatus}
                        />
                    </div>
                </details>
                <details className="collapse-panel w-lg-full m-15" open>
                    <summary className="collapse-header">
                        All Bugs
                    </summary>
                    <div className="collapse-content">
                        <BugTable
                            bugList={generalBugList}
                            handleCheckbox={handleCheckbox}
                            selectedAll={selectedAll}
                            selectedList={selectedList}
                            showLoading={showLoading}
                            updateStatus={updateStatus}
                        />
                    </div>
                </details>
            </div>
        </div>
    )
}