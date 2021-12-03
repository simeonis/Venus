import React from "react"
import "./modalstyle.css"
import {FaWindowClose} from 'react-icons/fa';

export const Modal = ({hideModal, ...props}) => {

    const stopProp = (event) =>{
        event.stopPropagation();
    }
    
    return(
        <div className="modal-wrap" onClick={() => hideModal()}>
            <div className="myModal bg-white-lm bg-dark-dm text-muted" id="modal-search" onClick={(e) => stopProp(e)}>
                <div className="close-wrap">
                    <FaWindowClose className="close-modal" onClick={() => hideModal()}  />
                </div>
                
                <div className="my-5 h-100 my-modal-content">{props.children}</div>
                
            </div>
        </div>
       
    )
}
