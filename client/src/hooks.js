import React,{useContext} from 'react';
import { TransactionContext } from './globalState/TransactionStateProvider';


export  function useTransactionState() {
  const [txState,setTxState]=useContext(TransactionContext);
  return [txState,setTxState];
}
