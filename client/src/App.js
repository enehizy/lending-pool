import React from 'react';
import NavBar from './components/NavBar';
import './custom-utilities.css';
import './app.css';

import Header from './components/Header';
import Borrow from './components/Borrow';
import {Redirect, Route, Switch} from 'react-router-dom';
import BuyCollateral from './components/BuyCollateral';
import DashBoard from './components/DashBoard';
export default function App(){
  return(
    
     <div >
       <main className="md:flex ">
        <NavBar/>
        <div className="w-full">
         <Header/>
         <div className="p-5 md:p-10">
         <h1 class="text-l md:text-xl font-bold text-gray-600">Borrow token or Buy Ethereum at a Discounted rate</h1>
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
  )
}
