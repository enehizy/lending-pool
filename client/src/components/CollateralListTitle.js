import React from 'react';

export default function CollateralListTitle(){
    return(
        <ul className="flex space-x-2 md:space-x-10 mt-2 ">
        <li className="font-bold">Asset</li>
        <li className="font-bold">Discount</li>
        <li className="font-bold">Market Price</li>
        <li className="font-bold">Sold at</li>
    </ul>
    )
}