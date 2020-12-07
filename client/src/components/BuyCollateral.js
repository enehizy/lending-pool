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
     const {selectedAccount,web3}=useWalletContext();
     const removeLoan=(id)=>{

      const result=  loans.filter((loan)=>{
         return  loan.id !== id;
        })
        setLoans(result);
 
     }
     useEffect(()=>{
     (async ()=>{
      if(selectedAccount){
         
          const pool = new BrtPool(web3);
          // await contract.borrow({from:selectedAccount,value: 1.2 * (10 ** 18)})
         const exLoans= await pool._getExpiredLoans();
          if(exLoans.length >= 1){
            setLoans(exLoans);
            console.log(exLoans);
            
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
             <p>percentage filter goes here..</p>
             <CollaterallListTitle/>
              {loans.map((loan)=>(
                <CollateralCard key={loan.id} id={loan.id} collateral={loan.collateral / (10 ** 18)} discount={100 - ((loan.redemptionPrice / loan.marketPrice) * 100)} marketPrice={loan.marketPrice / (10 ** 18)} soldAt={loan.redemptionPrice / (10 ** 18)} expires={loan.expires} removeLoan={removeLoan}/>
              ))}
            
            </>
             
             :
           <NothingFound text="There are no Collaterals to Purchase"/>
             }


             
           

             

         </>
     )
    }
 }