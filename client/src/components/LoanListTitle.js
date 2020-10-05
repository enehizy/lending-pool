import React from 'react';

export default function LoanListTitle(){
    return(
        <ul className="flex space-x-2 md:space-x-12 mt-2 ">
        <li className="font-bold">Borrowed</li>
        <li className="font-bold">Interest</li>
        <li className="font-bold">Payback</li>
        <li className="font-bold">Expires</li>
    </ul>
    )
}