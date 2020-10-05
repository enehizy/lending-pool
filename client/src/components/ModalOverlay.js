import React from 'react';
import ReactDOM from 'react-dom';

const Overlay=({children})=>{
    return(
      
        <div className="absolute inset-0  bg-black bg-opacity-75 flex md:justify-center  "  >
        {children} 
        </div>

    )
}


export default function ModalOverlay({children}){
    return(
    ReactDOM.createPortal(<Overlay>{children}</Overlay>,document.getElementById('modals'))
    )
}