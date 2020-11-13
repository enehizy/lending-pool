import React from 'react'
import { useWalletContext } from '../hooks'

function LoadingCardItem() {
    return (
     
        <div className="flex items-center space-x-8 md:space-x-16 pt-5 pb-5 pl-2  shadow-sm bg-gray-200  hover--shadow--xl   rounded-lg " >

        <div className="bg-gray-600 w-8 h-2">
      
        </div>
        <div className="bg-gray-600 w-8 h-2">
      
      </div>
      <div className="bg-gray-600 w-8 h-2">
      
      </div>
      <div className="bg-gary-600 w-8 h-2">
      
      </div>
      <div className="bg-ray-600 w-8 h-2">
      
      </div>
        </div>
    )
}

function ErrorText({message}){
    return(
    <h2 className="text-red-400 border-2 border-red-400 p-2 md:p-4 md:text-lg py-2 font-semibold text-center rounded-lg mt-4">{message}</h2>
    )

}

export default function LoadingCard(){
const {selectedAccount,selectedNetwork}=useWalletContext();
   return(
       <>
    <div className="space-y-4 animate-ping mt-5">
    <LoadingCardItem/>
    <LoadingCardItem/>
    <LoadingCardItem/>
    <LoadingCardItem/>

</div>  
{!selectedAccount?<ErrorText message="you need to connect to wallet to access this dapp"/>:<></>}  
{selectedNetwork ==1?<ErrorText message="This project is just for testing ,only avaliable on the  test networks"/>:<></>}  

</>

   )


}
