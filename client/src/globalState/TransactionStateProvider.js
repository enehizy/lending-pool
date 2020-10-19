import React,{useState} from 'react'
export const TransactionContext=React.createContext(undefined);

export default function TransactionStateProvider({children}) {
    const [txState,setTxState]=useState('Transaction in Progress...');
    return (
        <TransactionContext.Provider value={[txState,setTxState]}>
          {children}
        </TransactionContext.Provider>
    )
}



