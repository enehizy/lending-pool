import React,{useEffect, useState}from 'react';
import Symbol from './Symbol';
import TxButtons from './TxButtons';
import TxDetailsList from './TxDetailsList';
import TxDetailsListItem from './TxDetailsListItem';
import TxDetailsModal from './TxDetailsModal';
export default function Burrow(){
    const [loan,setLoan]=useState(0);
    const [collateral,setCollateral]=useState(0);
    const [showModal,setShowModal]=useState(false);
    const closeModal=()=>{
      setShowModal(false)
    }
    useEffect(()=>{
     if(loan < 0){
       setLoan(0);
     }
     if(collateral < 0){
       setCollateral(0)
     }
    },[loan,collateral])
    return(
      
        <div className="space-y-5">
             
              <div className="md:flex md:items-center md:space-x-10 space-y-2">
              <label>
            <p className="text-xl"> Loan</p>
            <input type="number" placeholder="loan amount" className="p-3 border-l rounded" disabled={collateral > 0?true:false} value={loan} onChange={(e)=>{setLoan(e.target.value)}}/>
    
            <Symbol symbol="BRT" bgColor="bg-gray-400" padding="p-3"/>
            </label>

            <div className="">
            <svg className="w-6 h-6 md:invisible "xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <svg className="w-6 h-6 invisible md:visible " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
            </div>

            
            <label>
            <p className="text-xl "> Collateral</p>
            <input type="number" placeholder="collateral amount" className="p-3 border-l" disabled={loan> 0?true:false} value={collateral} onChange={(e)=>{setCollateral(e.target.value)}}/>
            <Symbol symbol="ETH" bgColor="bg-gray-400" padding="p-3"/>
           
            </label>
            
            <div>
            <label className="text-xl">Interest Rate</label>
            <p className="text-2xl md:text-3xl font-bold text-green-400">5%</p>
            </div>
           
              </div>
            
             
             <button className="bg-gray-900 block p-2 rounded text-white rounded button-disabled" onClick={()=>{setShowModal(true)}} disabled={collateral == 0 && loan == 0}>Continue</button>
        
             <TxDetailsModal show={showModal} headerTitle="Transaction Overview">
                 <TxDetailsList>
                     <TxDetailsListItem title="Loan Amount" state="200 BRT"/>
                     <TxDetailsListItem title="Interest" state="5%"/>
                     <TxDetailsListItem title="Collaterization Ratio" state="150%"/>
                     <TxDetailsListItem title="Collateral Amount" state="200 ETH"/>
                     <TxDetailsListItem title="Payback price" state="235 BRT"/>
                     <TxDetailsListItem title="Expires" state="2 minutes"/>
                 </TxDetailsList>
                 <TxButtons close={closeModal}>
                    <button className="border-2 border-solid border-gray-900  text-gray-900 p-2 flex button-disabled" disabled >
                       Borrow
                       <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                       <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                       </svg>
                    </button>
                    
                 </TxButtons>
                 
                 <h5 className="text-red-600 text-center">Please connect to wallet</h5>
            </TxDetailsModal>
          
       </div>
       
     )
}