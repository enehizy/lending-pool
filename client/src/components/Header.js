import React ,{useState}from 'react';
import { useWalletContext } from '../hooks';
import ConnectedIcon from './ConnectedIcon';
import EtherIcon from './EtherIcon';
import Identicon from './Identicon';
import ModalOverlay from './ModalOverlay';
import WaitingForWallet from './WaitingForWallet';


export default function Header(){
   const[show,setShow]=useState(false)
   const {connectToWallet,selectedAccount}=useWalletContext();
    return(
        <header className="border-b p-3 flex justify-between item-center ">
        <h1 className="text-xl font-bold ">Lending Pool</h1>
        {!selectedAccount?
        <>
        
        <button className="flex align-items-center border border-gray-500 md:p-2 rounded-full" onClick={async()=>{
          setShow(!show)
          connectToWallet()
         
         
          ;
        }}>
         Connect To Wallet<EtherIcon/>


       </button> 
       <ModalOverlay show={show}>
            <WaitingForWallet message="Initailizing Wallet..">
               <button className="bg-red-700 p-2 text-white rounded-full" onClick={()=>{setShow(!show)}}>Go Back</button>
            </WaitingForWallet>
         </ModalOverlay>
        </>:
        <></>
        }
       
       {/* <Identicon address="0x47B2812CC92981998C61E4CD63e4Fd5A7C32e585"/> */}
       {selectedAccount?
        <div className="flex bg-gray-100 p-2 rounded-full font-bold  shadow-md">
      {selectedAccount.substr(0,7)}...{selectedAccount.substr(selectedAccount.length -6,selectedAccount.length)}<Identicon address={`${selectedAccount}`}/> 
        </div>:<></>
       }
      
       
        

    
      
      </header>

    )
}