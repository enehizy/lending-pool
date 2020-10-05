import React from 'react';
import CollateralCard from './CollateralCard';
import CollaterallListTitle from './CollateralListTitle';
import EtherIcon from './EtherIcon';
import CollateralCardContainer  from './loanCardContainer';
import Symbol from './Symbol';
 export default function BuyCollateral(){
     return(
         <div className="">
        
          <CollateralCardContainer>
             {/* <button className="border-solid ">Filter</button> */}
             {/* <input type="range"/> */}
             <CollaterallListTitle/>
             <CollateralCard collateral="200" discount="5" marketPrice="500" soldAt="200"/>
             <CollateralCard collateral="200" discount="5" marketPrice="500" soldAt="200"/>
             <CollateralCard collateral="200" discount="5" marketPrice="500" soldAt="200"/>
             <CollateralCard collateral="200" discount="5" marketPrice="500" soldAt="200"/>
             
                
            
             
          </CollateralCardContainer>


         </div>
     )
 }