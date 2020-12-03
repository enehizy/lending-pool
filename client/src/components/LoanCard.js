import React,{useRef, useState} from 'react';
import BrtPool from '../contracts/BrtPool';
import BrtToken from '../contracts/Brt';
import { useWalletContext } from '../hooks';
import ModalOverlay from './ModalOverlay';
import TxButtons from './TxButtons';
import TxDetailsList from './TxDetailsList';
import TxDetailsListItem from './TxDetailsListItem';
import TxDetailsModal from './TxDetailsModal';
import WaitingForWallet from './WaitingForWallet';
import BrtPoolJson from '../abis/BRTPOOL.json';
export default function LoanCard({borrowed,payBack,expires,id}){
    const [showModal,setShowModal]=useState(false)
    const {web3,selectedAccount}=useWalletContext()
    const [buttons,setButtons]=useState(false);
    const [transferModal,setTransferModal]=useState(false);
    const [waitingForWallet,setWaitingForWallet]=useState(false);
    const transferTo=useRef();
    const [transactionMessage,setTransactionMessage]=useState('');
    const openModal=()=>{
        setShowModal(true)
    }
    const closeModal=()=>{
        setShowModal(false)
    }
    const payback=async (loanId,web3,options)=>{
        const token =new BrtToken(web3);
        const network=  await web3.eth.net.getId();
        const poolAddr=BrtPoolJson.networks[`${network}`].address;
        await token._approveAndPayback(poolAddr,loanId,options);
        
       
    }
    const transferFrom=async (to,tokenId,options,web3)=>{
        const pool=new BrtPool(web3);
        setTransferModal(false);
        setTransactionMessage(`Transfering loan ${id} to ${to}`);
        setWaitingForWallet(true);
        await pool.transferFrom(options.from,to,tokenId,{...options});
        setWaitingForWallet(false);
    }
    return(
        <>
        <div className="flex align-center flex-wrap space-x-8 md:space-x-16 pt-5 pb-5 pl-2  shadow-lg   hover--shadow--xl   rounded-lg " onClick={()=>{setButtons(!buttons)}}>
             <div className="">
            <span className="text-l md:text-xl font-hairline ">{borrowed}ETH</span>
                
             </div>
             <div className="">
            <span className="text-l md:text-xl text-green-400 font-hairline">5%</span>
                
             </div>
             <div className="">
            <span className="text-l md:text-xl font-hairline">{payBack}BRT</span>
                
             </div>
             <div className="">
            <span className="text-l md:text-xl font-hairline">{expires} </span> 
           
             </div>
             <div className="flex justify-center gap-2 mt-2"><button  className=" bg-blue-600 text-white p-2 rounded-lg" onClick={()=>{openModal()}}>payback</button> <button className=" bg-blue-600 text-white p-2 rounded-lg" onClick={()=>{setTransferModal(!transferModal)}}>transfer</button></div>
           
             
          

             
            
             </div>


             <ModalOverlay show={transferModal} label="Transfer modal">
                <TxDetailsModal  headerTitle="Transfer Loan">
                <TxDetailsList>
                        <TxDetailsListItem title="Loan id" state={id}/>
                        <TxDetailsListItem title="Collateral Locked" state={`${borrowed} ETH`}/>
                        <TxDetailsListItem title="Redemption price" state={`${payBack} BRT`}/>
                      
                    </TxDetailsList>
                    <div className="p-2 space-y-2">
                    <label className="block">To:</label>
                    <input ref={transferTo} type="text" className="border-2 border-gray-900 p-2 w-full bg-gray-300 " placeholder="address of account you wnat to transfer to..."/>
                    </div>
                    <TxButtons close={()=>{setTransferModal(!transferModal)}}>
                    <button onClick={()=>{transferFrom(transferTo.current.value,id,{from:selectedAccount},web3)}} className="border-2 border-solid border-gray-900  text-gray-900 p-2 flex button-disabled" disabled={selectedAccount?false:true} >
                        Transfer
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        </button>
                    </TxButtons>
                </TxDetailsModal>
             </ModalOverlay>
          
           
             
             <ModalOverlay show={waitingForWallet} label="waiting modal">
               
            <WaitingForWallet message="waiting for confirnmation.." summary={transactionMessage}>
               <button className="bg-red-700 p-2 text-white rounded-full" onClick={()=>{setWaitingForWallet(!waitingForWallet)}}>Go Back</button>
            </WaitingForWallet>
         </ModalOverlay>

             <ModalOverlay show={showModal} label="payback modal">
                <TxDetailsModal  headerTitle="Transaction Overview">
                    <TxDetailsList>
                        <TxDetailsListItem title="Loan id" state={id}/>
                        <TxDetailsListItem title="Borrowed" state={`${borrowed} ETH`}/>
                        <TxDetailsListItem title="Interest" state="5%"/>
                        <TxDetailsListItem title="Payback price" state={`${payBack} BRT`}/>
                        <TxDetailsListItem title="Collaterization Ratio" state="150%"/>
                    </TxDetailsList>
                    <TxButtons close={closeModal}>
                        <button onClick={()=>{payback(id,web3,{from:selectedAccount})}} className="border-2 border-solid border-gray-900  text-gray-900 p-2 flex button-disabled" disabled={selectedAccount?false:true} >
                        Payback
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        </button>

                        
                    </TxButtons>
                    
                   
                </TxDetailsModal>
            </ModalOverlay>
             </>
    )
}