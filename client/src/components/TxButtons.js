import React from 'react';

export default function TxButtons({close,children}){
    return(
        <div className="buttons flex justify-center space-x-2">
             
        <button className="bg-gray-900  text-white p-2 flex "  onClick={()=>{close()}}>
            <svg className="w-6 h-6"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
         Close
        </button>
         {children}

        </div>  
    )
}