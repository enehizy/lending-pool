import React,{useState,useEffect} from 'react';
import CollateralCard from './CollateralCard';
import CollaterallListTitle from './CollateralListTitle';
import BrtPool from '../contracts/BrtPool';

import LoadingCard from './LoadingCard';
import { useWalletContext } from '../hooks';
import NothingFound from './NothingFound';
 export default function BuyCollateral(){
    
    //  const [loading,setLoading]=useState(false);
     const [loading,setLoading]=useState(true);
     const [loans,setLoans]=useState([]);
     const {selectedAccount}=useWalletContext();
     useEffect(()=>{
     (async ()=>{
      if(selectedAccount){
         
          const contract = new BrtPool();
          // await contract.borrow({from:selectedAccount,value: 1.2 * (10 ** 18)})
          const exLoan= await contract.getExpiredLoanIds()
          if(exLoan.length >= 1){
            setLoans(exLoan);

          }
          setLoading(false);


         
     
       
      }


     })()


     },[selectedAccount])

  if(loading){
    return(
      <LoadingCard/>  
    )
  }
  else{
     return(
         <>
         
       
             {/* <button className="border-solid ">Filter</button> */}
             {/* <input type="range"/> */}

             {loans.length >= 1?
             <>
             <div className="space-x-2">
                
             <label >
                from:
                 <input type="number" className="p-1 border-2"/>
             </label>
             <label >
            to:
               <input type="number" className="p-1 border-2"/>
             </label>
             <select className="p-1 border-2 border-gray-900 rounded">
                     <option >ETH</option>
                     <option >BRT</option>
             </select>
             <button className="bg-red-700 p-1 text-white">filter</button>
             </div>
             <CollaterallListTitle/>
              {loans.map((loan,index)=>(
                <CollateralCard key={index} collateral={loan.collateral} discount="5" marketPrice="..." soldAt={loan.redemptionPrice} expires={loan.expires}/>
              ))}
            
            </>
             
             :
           <NothingFound text="There are no Collaterals to Purchase"/>
             }


             
           

             

         </>
     )
    }
 }