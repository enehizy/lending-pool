import React from 'react';

export default function TxDetailsList({children}){
    return(
        <ul className="p-2 space-y-2 divide-y-2 divide-dashed divide-gray-900">
         {children}
       </ul>
    )
}