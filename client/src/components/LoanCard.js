import React,{useState} from 'react';
import ModalOverlay from './ModalOverlay';
import TxButtons from './TxButtons';
import TxDetailsList from './TxDetailsList';
import TxDetailsListItem from './TxDetailsListItem';
import TxDetailsModal from './TxDetailsModal';

export default function LoanCard({borrowed,payBack,expires}){
    const [showModal,setShowModal]=useState(false)
    const openModal=()=>{
        setShowModal(true)
    }
    const closeModal=()=>{
        setShowModal(false)
    }
    
    return(
        <>
        <div className="flex space-x-8 md:space-x-16 pt-5 pb-5 pl-2  shadow-lg hover--shadow--xl rounded-lg " onClick={openModal}>
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
           
             
          

             
            
             </div>
             <ModalOverlay show={showModal}>
                <TxDetailsModal  headerTitle="Transaction Overview">
                    <TxDetailsList>
                        <TxDetailsListItem title="Loan id" state="1"/>
                        <TxDetailsListItem title="Borrowed" state="100 ETH"/>
                        <TxDetailsListItem title="Interest" state="5%"/>
                        <TxDetailsListItem title="Payback price" state="150 BRT"/>
                        <TxDetailsListItem title="Collaterization Ratio" state="150%"/>
                    </TxDetailsList>
                    <TxButtons close={closeModal}>
                        <button className="border-2 border-solid border-gray-900  text-gray-900 p-2 flex button-disabled" disabled >
                        Payback
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        </button>
                        
                    </TxButtons>
                    
                    <h5 className="text-red-600 text-center">Please connect to wallet</h5>
                </TxDetailsModal>
            </ModalOverlay>
             </>
    )
}