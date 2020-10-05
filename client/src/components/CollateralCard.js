import React,{useState} from 'react';
import TxButtons from './TxButtons';
import TxDetailsList from './TxDetailsList';
import TxDetailsListItem from './TxDetailsListItem';
import TxDetailsModal from './TxDetailsModal';

export default function CollateralCard({collateral,discount,marketPrice,soldAt}){
    const [showModal,setShowModal]=useState(false)
    const openModal=()=>{
        setShowModal(true)
    }
    const closeModal=()=>{
        setShowModal(false)
    }
    
    return(
        <>
        <div className="flex space-x-8 md:space-x-12 pt-5 pb-5  hover:bg-gray-300 hover:opacity-75 hover:cursor-pointer" onClick={openModal}>
             <div className="">
            <span className="text-l md:text-xl font-hairline ">{collateral}ETH</span>
                
             </div>
             <div className="">
            <span className="text-l md:text-xl text-green-400 font-hairline">{discount}%</span>
                
             </div>
             <div className="">
            <span className="text-l md:text-xl font-hairline">{marketPrice}BRT</span>
                
             </div>
             <div className="">
            <span className="text-l md:text-xl font-hairline">{soldAt}BRT </span> 
                
             </div>
          

             
            
             </div>
             <TxDetailsModal show={showModal} headerTitle="Transaction Overview">
                 <TxDetailsList>
                     <TxDetailsListItem title="Loan id" state="1"/>
                     <TxDetailsListItem title="Discount" state="5%"/>
                     <TxDetailsListItem title="Collateral Amount" state="500 ETH"/>
                     <TxDetailsListItem title="Market price" state="500 BRT"/>
                     <TxDetailsListItem title="Sold At" state="200 BRT"/>
                 </TxDetailsList>
                 <TxButtons close={closeModal}>
                    <button className="border-2 border-solid border-gray-900  text-gray-900 p-2 flex button-disabled" disabled >
                       Buy
                       <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                       <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                       </svg>
                    </button>
                    
                 </TxButtons>
                 
                 <h5 className="text-red-600 text-center">Please connect to wallet</h5>
            </TxDetailsModal>
             </>
    )
}