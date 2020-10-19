import React from 'react';
import ModalOverlay from './ModalOverlay';
import TxButtons from './TxButtons';
import TxDetailsList from './TxDetailsList';


export default  function TxDetailsModal({children,headerTitle}){
    // </>
    {/* </ModalOverlay> */}
        // <ModalOverlay>
        
        return(
           
        
            <>
              <div className="bg-white text-gray-900 max-width-700 mt-10 md:mb-20 rounded-lg z-500 transition-opacity duration-600 ease-in-out " >
             <header className="bg-gray-900 p-3 text-white rounded-t-lg"><h2 className="text-2xl">{headerTitle}</h2></header>
                 {children}
              </div>
             </>
           
        )
  
}