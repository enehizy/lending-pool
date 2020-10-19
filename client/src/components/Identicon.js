import React from 'react'
import Identiconjs from 'identicon.js';

function data(hash){
    var options = {                             // 20% margin
        size: 420,                                // 420px square
        format: 'svg'                             // use SVG instead of PNG
      };
    const _data = new Identiconjs(`${hash}`, options).toString();
    return _data;
}
 
export default function Identicon({address}) {
    return (
        <div>
           <img className="w-6 h-6" src={`data:image/svg+xml;base64,${data(address)}`}/>
        </div>
    )
}
