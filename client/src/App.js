import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import './custom-utilities.css';
// import './App.css';
import './styles/app.css';
import Header from './components/Header';
import Borrow from './components/Borrow';
import {Redirect, Route, Switch} from 'react-router-dom';
import BuyCollateral from './components/BuyCollateral';
import DashBoard from './components/DashBoard';
import ConnectToTestnet from './components/ConnectToTestnet';
import TransactionStateProvider from './globalState/TransactionStateProvider';
import TxLoader from './components/TxLoader';
import {useWalletContext} from './hooks';
import BrtPool from './contracts/BrtPool';
export default function App(){
  const {connectToWallet,selectedNetwork,selectedAccount,web3} =useWalletContext();




  return(
    <TransactionStateProvider>
     <div >
       
        {/* <p className="shadow-lg p-2 flex justify-center items-center bg-orange-400 text-white">You need to connect to any test network to use this app</p> */}
       <main className="md:flex">
        <NavBar/>
        <div className="flex-1 ">
       
         {/* <p className="flex bg-blue-700 text-white p-2 justify-center items-center sticky ">Click here to view transactions...</p> */}
         
         <Header/>
        <ConnectToTestnet/>
      
         {/* <TxLoader/> */}
         
         <div className="p-5 md:p-10">
        
         <h1 className="text-l md:text-xl font-bold text-gray-600">Borrow token or Buy Ethereum at a Discounted rate</h1>
          {/* <BuyCollateral/> */}
       
              <Switch>
                  <Route exact path="/">
                    <Redirect to="/borrow"/>
                  </Route>
                  <Route  path="/borrow" component={Borrow}/>
                  <Route  path="/buy" component={BuyCollateral}/>
                  <Route  path="/dashboard" component={DashBoard}/>

                 
              </Switch>

         
         </div>
        
          <div>

          </div>
        </div>
       </main>
       
 
    </div>
    </TransactionStateProvider>
  )
}
