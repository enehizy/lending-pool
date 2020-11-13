import React,{useEffect,useReducer} from 'react';
import getWeb3 from '../getWeb3';

import Web3 from 'web3';
export const WalletContext=React.createContext(undefined);


const walletState={
  selectedAccount:null,
  selectedNetwork:null,
  web3:null,
 
}
const walletReducer=(state,action)=>{
  if(action.type == "accountChanged"){
    return {...state,
      selectedAccount:action.payload
    }
  }
  if(action.type == 'networkChanged'){
    return {
      ...state,
      selectedNetwork:action.payload

    }
  }
  if(action.type == 'initweb3'){
    return{
      ...state,
      web3:action.payload
    }
  }
  
  return state;
}


export default function WalletProvider({children}){
    const [state,dispatch]= useReducer(walletReducer,walletState);
    const {selectedAccount,selectedNetwork,web3}=state;

    const connectToWallet=async()=>{
      const w3=await getWeb3();
      const accounts= await w3.eth.getAccounts();
      const networkid=await w3.eth.net.getId();
      dispatch({type:"accountChanged",payload:accounts[0]})
      dispatch({type:"networkChanged",payload:networkid})
      dispatch({type:'initweb3',payload:w3})
     }
    useEffect(()=>{
        (async function(){
          const {ethereum}=window;
          if(ethereum){
             if(ethereum.isConnected()){
              ethereum.on('accountsChanged',async(accounts)=>{
                dispatch({type:'accountChanged',payload:accounts[0]})
               })
               ethereum.on('networkChanged',(networkId)=>{
                dispatch({type:'networkChanged',payload:networkId})
               })
               if(selectedAccount){
                const web3=await getWeb3();
                dispatch({type:'initweb3',payload:web3});
                // const accounts=await web3.eth.getAccounts()
                // const networkId=await web3.eth.net.getId()
                // dispatch({type:'accountChanged',payload:accounts[0]});
                // dispatch({type:'networkChanged',payload:networkId});
  
               }
               else{
                      const  readOnlyWeb3 = new Web3('http://localhost:7545');
                      dispatch({type:'initweb3',payload:readOnlyWeb3});
               }
              
             
             }
          }
      

      //  })
        })()
    },[])
    return(
        <WalletContext.Provider value={{selectedAccount,selectedNetwork,web3,connectToWallet}}>
           {children}
        </WalletContext.Provider>
    )
}