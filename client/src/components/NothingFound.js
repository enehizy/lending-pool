import React from 'react'

export default function NothingFound({text}) {
    return (
        <div className=" mt-4">
        <p className="p-4 text-l md:text-xl font-bold">{text}</p>
        <p className="border-t-4 border-solid border-gray-900 w-24"></p>
     </div>
    )
}
