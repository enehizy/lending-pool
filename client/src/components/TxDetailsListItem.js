import React from 'react';

export default function TxDetailsListItem({title,state}){
    return(
        <li>
          <label className="text-base md:text-xl font-bold">{title}</label>
          <p className="font-semibold ">{state}</p>
        </li>
    )
}