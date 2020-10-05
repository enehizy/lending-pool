import React from 'react';
import EtherIcon from './EtherIcon';

export default function Header(){
    return(
        <header className="border-b p-3 flex justify-between item-center">
        <h1 className="text-xl font-bold ">Lending Pool</h1>
       <button className="flex align-items-center border border-gray-500 md:p-2">
         Connect To Wallet<EtherIcon/>
       </button>
      </header>

    )
}