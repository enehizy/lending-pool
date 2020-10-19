import React from 'react';
import LoanCard from './LoanCard';

import LoanListTitle from './LoanListTitle';

export default function DashBoard(){
    return(
     
        <>
            <LoanListTitle/>
            <LoanCard borrowed="200" payBack="234" expires="2 minutes"/>
            <LoanCard borrowed="200" payBack="234" expires="2 minutes"/>
            <LoanCard borrowed="200" payBack="234" expires="2 minutes"/>
            <LoanCard borrowed="200" payBack="234" expires="2 minutes"/>
            </>
       
    )
}