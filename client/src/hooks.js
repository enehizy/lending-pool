import React,{useContext} from 'react';
import { TransactionContext } from './globalState/TransactionStateProvider';
import { WalletContext } from './globalState/WalletProvider';



export  function useTransactionState() {
  const [txState,setTxState]=useContext(TransactionContext);
  return [txState,setTxState];
}

export function useWalletContext(){
  const   {selectedAccount,selectedNetwork,web3,connectToWallet} =useContext(WalletContext);
  return {selectedAccount,selectedNetwork,web3,connectToWallet};
}

