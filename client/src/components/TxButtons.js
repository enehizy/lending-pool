import React from 'react';
import { useWalletContext } from '../hooks';
import LoadingIcon from './LoadingIcon';

export default function TxButtons({close,children,pending}){
    const {selectedAccount} =useWalletContext();
    return(
        <>
        <div className="buttons flex justify-center space-x-2 items-center">
             
        <button className="bg-gray-900  text-white p-2 flex "  onClick={()=>{close()}}>
            <svg className="w-6 h-6"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        Close
        </button>
         {children}
        

        </div> 
        {!selectedAccount?<h5 className="text-red-600 text-center">Please connect to wallet</h5>:<></>} 

        </>
    )
}