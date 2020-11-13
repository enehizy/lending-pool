import React from 'react'
import { useWalletContext } from '../hooks'
const ErrorDiv=({message})=>{
    return(
    <p className=" p-1 md:p-2 flex max-width-300 items-center border-solid bg-orange-500 text-white uppercase font-mono">
     {message}
     </p>   
    )
}


export default function ConnectWarning() {
    const {selectedAccount,selectedNetwork}=useWalletContext()
    if(!selectedAccount){
        return (
        <ErrorDiv message="please connect to wallet"/>
        )
    }
    else{
        return(<>
         {selectedNetwork ==1?<ErrorDiv message="This is a side project ,connect to any testnet to use "/>:<></>}
        </>)
    }
    
}
