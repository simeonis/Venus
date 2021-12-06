import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from "../../context/AuthContext";
import { useLocation, Link } from 'react-router-dom';
import Chart from "react-google-charts";
import { BugEnums } from "../../constants/BugConstants"
import { FaBuffer, FaBug, FaChartPie, FaCheck, FaCrown, FaExclamationTriangle, FaTachometerAlt } from 'react-icons/fa'
import { IoPulseSharp } from 'react-icons/io5'
import { ApiUrls } from "../../constants/ApiConstants";
import axios from 'axios';

export const ProjectDashboard = () => {
    const { projectList, getProjects } = useContext(AuthContext)
    const location = useLocation()

    const [project, setProject] = useState({})
    const [owner, setOwner] = useState("")
    const [totalBugs, setTotalBugs] = useState(0)
    const [openBugs, setOpenBugs] = useState(0)
    const [closedBugs, setClosedBugs] = useState(0)
    const [pieData, setPieData] = useState([['Bug Status', 'Amount']])
    const [pieEmpty, setPieEmpty] = useState(true)

    const bugCategory = BugEnums.category
    const bugStatus = BugEnums.status
    const bugSeverity = BugEnums.severity

    useEffect(() => {
        // Refresh list of projects
        getProjects()
        // Find project based on id
        const currProj = projectList.find(proj => proj.id === location.query)
        console.log(currProj)
        setProject(currProj)
        // Find the project owner's username
        getOwner(currProj.ownerID)
        // Get bugList and calculate summary
        calculateSummary(currProj.bugs)
    }, [])

    const getOwner = (id) => {
        axios.get(ApiUrls.getUsername + `/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setOwner(response.data)
                }
            })
            .catch(error => {
                console.error('There was an error!', error.response);
            });
    }

    const calculateSummary = (bugs) => {
        // 1. get all bugs
        // 2. count each status
        // 3. setPieData
        // 4. !setPieEmpty
    }

    const pieOptions = {
        pieHole: 0.6,
        slices: [
            {
                color: "#2BB673",
                offset: 0.025
            },
            {
                color: "#d91e48",
                offset: 0.025
            },
            {
                color: "#007fad",
                offset: 0.025
            }
        ],
        legend: {
            position: "labeled",
            alignment: "center",
            textStyle: {
                color: "#46954a",
                fontSize: 14,
                bold: true
            }
        },
        tooltip: {
            trigger: 'none'
        },
        pieSliceText: 'none',
        backgroundColor: 'transparent',
        pieSliceBorderColor: 'transparent'
    };

    return (
        <div className="container-fluid">
            <div className="row m-0 p-0">
                <div className="col-4 container-fluid">
                    <div className="row row-eq-spacing-sm">
                        <div className="col">
                            <div className="card">
                                <h3 className="card-title mb-0">{project.title}</h3>
                                <p className="mt-0">{project.description}</p>
                                <div className="card user m-0 p-10 d-flex justify-content-start">
                                    <FaCrown className="m-5" color={'#ffd22a'}/>
                                    <span className="ml-5 text-center">{owner}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-eq-spacing-sm">
                        <div className="col">
                            <div className="card h-full">
                                <h3 className="card-title mb-20">Project Specifications</h3>
                                <details class="collapse-panel">
                                    <summary class="collapse-header">
                                        Category
                                    </summary>
                                    <div class="collapse-content p-0">
                                        {
                                            Object.keys(bugCategory).map((key, i) =>
                                                <div className="m-0 p-10 d-flex justify-content-start">
                                                    <FaBuffer className="m-5" />
                                                    <span className="ml-5">{bugCategory[key]}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </details>
                                <details class="collapse-panel my-20">
                                    <summary class="collapse-header">
                                        Status
                                    </summary>
                                    <div class="collapse-content p-0">
                                        {
                                            Object.keys(bugStatus).map((key, i) =>
                                                <div className="m-0 p-10 d-flex justify-content-start">
                                                    <IoPulseSharp className="m-5" />
                                                    <span className="ml-5">{bugStatus[key]}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </details>
                                <details class="collapse-panel">
                                    <summary class="collapse-header">
                                        Severity
                                    </summary>
                                    <div class="collapse-content p-0">
                                        {
                                            Object.keys(bugSeverity).map((key, i) =>
                                                <div className="m-0 p-10 d-flex justify-content-start">
                                                    <FaTachometerAlt className="m-5" />
                                                    <span className="ml-5">{bugSeverity[key]}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col container-fluid m-0 p-0">
                    <div className="row row-eq-spacing-sm justify-content-start p-0">
                        <div className="col-3 ml-0 pl-0">
                            <div className="card d-flex flex-column justify-content-center align-items-center">
                                <FaBug size={50} color={'#007fad'}/>
                                <h3 className="card-title text-center pt-5">Total Bugs</h3>
                                <span className="font-size-24">{totalBugs}</span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="card d-flex flex-column justify-content-center align-items-center">
                                <FaExclamationTriangle size={50} color={'#d91e48'}/>
                                <h3 className="card-title text-center pt-5">Open Bugs</h3>
                                <span className="font-size-24">{openBugs}</span>
                            </div>
                        </div>
                        <div className="col-3 mr-0 pr-0">
                            <div className="card d-flex flex-column justify-content-center align-items-center">
                                <FaCheck size={50} color={'#2BB673'}/>
                                <h3 className="card-title text-center pt-5">Closed Bugs</h3>
                                <span className="font-size-24">{closedBugs}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row row-eq-spacing-sm justify-content-start p-0">
                        <div className="col-9 m-0 p-0">
                            <div className="card m-0 p-0 d-flex flex-column justify-content-center align-items-center">
                                <h3 className="card-title text-center m-0 pt-15">Pie Chart</h3>
                                {pieEmpty ? <FaChartPie size={50} className="m-20" /> :
                                    <div className="pieChart">
                                        <Chart
                                            width={'900px'}
                                            height={'600px'}
                                            chartType="PieChart"
                                            loader={<div>Loading Chart</div>}
                                            data={pieData}
                                            options={pieOptions}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}