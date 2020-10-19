import React from 'react';
import ReactDOM from 'react-dom';

const Overlay=({children,show})=>{
    return(
      
        <div className={`absolute inset-0  bg-black bg-opacity-75 flex md:justify-center ${show?null:'hidden'}`}  >
        {children} 
        </div>

    )
}


export default function ModalOverlay({children,show}){
    return(
    ReactDOM.createPortal(<Overlay show={show}>{children}</Overlay>,document.getElementById('modals'))
    )
}