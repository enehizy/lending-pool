import React,{useState} from 'react';
import { useWalletContext } from '../hooks';
import ModalOverlay from './ModalOverlay';
import TxButtons from './TxButtons';
import TxDetailsList from './TxDetailsList';
import TxDetailsListItem from './TxDetailsListItem';
import TxDetailsModal from './TxDetailsModal';
import BrtPoolJson from '../abis/BRTPOOL.json';
import BrtToken from '../contracts/Brt';

export default function CollateralCard({id,collateral,discount,marketPrice,soldAt}){

    const [showModal,setShowModal]=useState(false)
    const {web3,selectedAccount} = useWalletContext();
    const openModal=()=>{
        setShowModal(true)
    }
    const closeModal=()=>{
        setShowModal(false)
    }
    const liquidate=async (loanId,web3,options)=>{
        const token =new BrtToken(web3);
        const network=  await web3.eth.net.getId();
        const poolAddr=BrtPoolJson.networks[`${network}`].address;
        await token._approveAndLiquidate(poolAddr,loanId,options);
        
       
    }
    
    return(
        <>
        <div className="flex space-x-8 md:space-x-12 pt-5 pb-5  pl-2  shadow-lg hover--shadow--xl rounded-lg" onClick={()=>{openModal()}}>
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
             <ModalOverlay show={showModal}>
                <TxDetailsModal  headerTitle="Transaction Overview" label="transaction modal">
                    <TxDetailsList>
                        <TxDetailsListItem title="Loan id" state={id}/>
                        <TxDetailsListItem title="Discount" state={`${discount} %`}/>
                        <TxDetailsListItem title="Collateral Amount" state={`${collateral} ETH`}/>
                        <TxDetailsListItem title="Market price" state={`${marketPrice} BRT`}/>
                        <TxDetailsListItem title="Sold At" state={`${soldAt} BRT`}/>
                    </TxDetailsList>
                    <TxButtons close={closeModal}>
                               

                        <button className="border-2 border-solid border-gray-900  text-gray-900 p-2 flex button-disabled" disabled={selectedAccount?true:false} onClick={()=>{
                            liquidate(id,web3,{from:selectedAccount});
                        }}>
                        Buy
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        </button>
                        
                    </TxButtons>
                    
                   
                </TxDetailsModal>
            </ModalOverlay>
             </>
    )
}