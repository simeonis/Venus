import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ApiUrls } from '../../../constants/ApiConstants'
import { FaPlus, FaTrash, FaPen } from 'react-icons/fa'
import { BugTable } from '../../components/tables/BugTable'
import { BugEnums } from "../../../constants/BugConstants"

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
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setTimeout(() => { if (loading) { setShowLoading(true) } }, 100)
        getBugs()
    }, [])

    useEffect(() => {
        const filteredList = generalBugList.map(bug => bug.severity === BugEnums.severity.High ? bug : null).filter(item => item)
        setUserBugList(filteredList)
    }, [generalBugList])

    useEffect(() => {
        console.log(selectedList)
    }, [selectedList])

    // START Web API Calls
    // Get All
    const getBugs = () => {
        console.log("Get called")
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
                    console.log(response)
                    if (response.status === 200) {
                        getBugs() // Refresh UI
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error.response);
                })
        }
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

                    if (bug.id === id) {
                        bug.selected = !bug.selected
                    }
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
                <button className="center btn btn-square btn-primary rounded-circle mx-5 shadow"><FaPlus /></button>
                <button className="center btn btn-square btn-secondary rounded-circle mx-5 text-white shadow" disabled={!canModify}><FaPen /></button>
                <button className="center btn btn-square btn-danger rounded-circle mx-5 shadow" disabled={!canDelete} onClick={(e) => delBug()}><FaTrash /></button>
            </div>
            <div className="d-flex flex-column align-items-center mx-20 px-20">
                <details class="collapse-panel w-full m-15">
                    <summary class="collapse-header">
                        My Bugs
                    </summary>
                    <div class="collapse-content">
                        <BugTable
                            bugList={userBugList}
                            handleCheckbox={handleCheckbox}
                            selectedAll={selectedAll}
                            selectedList={selectedList}
                            showLoading={showLoading}
                        />
                    </div>
                </details>
                <details class="collapse-panel w-full m-15">
                    <summary class="collapse-header">
                        All Bugs
                    </summary>
                    <div class="collapse-content">
                        <BugTable
                            bugList={generalBugList}
                            handleCheckbox={handleCheckbox}
                            selectedAll={selectedAll}
                            selectedList={selectedList}
                            showLoading={showLoading}
                        />
                    </div>
                </details>
            </div>
        </div>
    )
}