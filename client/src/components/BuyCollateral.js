import React,{useState} from 'react';
import CollateralCard from './CollateralCard';
import CollaterallListTitle from './CollateralListTitle';
import EtherIcon from './EtherIcon';
import Symbol from './Symbol';
import InputRange from 'react-input-range';
 export default function BuyCollateral(){
     const {value,setValue}=useState(1)
     return(
         <div className="">
        
       
             {/* <button className="border-solid ">Filter</button> */}
             {/* <input type="range"/> */}
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
        
             <CollateralCard collateral="200" discount="5" marketPrice="500" soldAt="200"/>
             <CollateralCard collateral="200" discount="5" marketPrice="500" soldAt="200"/>
             <CollateralCard collateral="200" discount="5" marketPrice="500" soldAt="200"/>
             <CollateralCard collateral="200" discount="5" marketPrice="500" soldAt="200"/>
             
                
            
             
       


         </div>
     )
 }