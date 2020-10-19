import React from 'react';
import ModalOverlay from './ModalOverlay';
 export default function Modal({children}){
     return(
         <ModalOverlay>
             {children}
         </ModalOverlay>
     )

 }