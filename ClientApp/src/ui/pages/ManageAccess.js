import React, {useState} from "react"
import {Modal} from "../components/modal/Modal"

export const ManageAccess = () =>{
    
    const [modal, setModal] = useState(false)
    
    const handleAddPeople = ()=>{
        
    }
    
    const showModal = () =>{
        setModal(true)
    }
    const hideModal = () =>{
        setModal(false)
    }
    
    return(
        <div>
            <div>
                <h1>Manage Access</h1> <button onClick={() => showModal()}>Add People</button>
            </div>
            {
                modal ? (
                    <Modal hideModal={hideModal}>
                            <form className="modal-form">
                                <div>
                                    <input  /><button>Search</button>
                                </div>
                                <button className="btn btn-primary btn-block mt-10">Add User</button>
                            </form>
                    </Modal>
                ) : null
            }
            <form>
                <input  />
            </form>
        </div>
    )
}