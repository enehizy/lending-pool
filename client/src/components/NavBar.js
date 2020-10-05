import React from 'react';
import { NavLink } from 'react-router-dom';
import BorrowIcon from './BorrowIcon';
import BuyIcon from './BuyIcon';
import DashboardIcon from './DashboardIcon';

export default function Navbar(){
    return(
  
     <nav className="relative  md:static md:h-screen md:border-r  bg-gray-700 text-gary-900 opacity-" >
        <ul className="fixed bottom-0 flex border-t-2 md:border-t-0 w-full p-2 md:p-5 nd:p-l-2 md:p-10 justify-between md:block md:space-y-10 md:static  bg-gray-700 ">
          <li className=" uppercase border-b-l">
          <NavLink to="/borrow" activeClassName="text-white">
             <BorrowIcon/>
              Borrow
          </NavLink>
           </li>
          <li className=" uppercase">
            <NavLink to="/buy" activeClassName="text-white">
              <BuyIcon/>Buy Collateral
            </NavLink>
            </li>
          <li className=" uppercase ">
            <NavLink to="/dashboard" activeClassName="text-white">
              <DashboardIcon/>Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
    )
}