import React from 'react';

export default function Symbol({bgColor,symbol,padding}){
    return(
        <span className={`${bgColor} ${padding}`}>{symbol}</span>
    )
}