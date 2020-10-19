import React from 'react'
import LoadingIcon from './LoadingIcon';
import {useTransactionState} from '../hooks';

export default function TxLoader() {
    const [txState,setTxState] =useTransactionState();
    if(txState !== ''){
        return (
            <div className="flex justify-left items-center space-x-2 "> 
        <div className="flex p-2 shadow-lg bg-gray-700 text-white "><LoadingIcon/>{txState}</div><p className="border-2 border-gray-900 p-1">3 Transactions
        <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      className="w-6 h-6 inline "
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
      ></path>
    </svg>
        </p>
          </div>
        )
    }
    return(<></>)
    
}
