import React from 'react'

export default function WaitingForWallet({children,message,summary}) {
    return (
        <div className="bg-white max-width-500 mb-10 mt-10 rounded  flex justify-center items-center ">
              <div>x</div>
                     
                   <div className="space-y-4">
                   <p className="text-red-700 text-xl text-center font-bold">{summary}</p>
                   <h2 className="text-center text-xl font-semibold">{message}</h2>
                   <h3 className="text-center text-xl text-red-700">Wallet should popup anytime soon</h3>
                 
                   <div className="flex items-center justify-center">
                   <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 330 330"
      version="1.1"
      viewBox="0 0 330 330"
      xmlSpace="preserve"
      className="w-10 h-10 animate-spin"
    >
      <g>
        <path d="M97.5 165c0-8.284-6.716-15-15-15h-60c-8.284 0-15 6.716-15 15s6.716 15 15 15h60c8.284 0 15-6.716 15-15z"></path>
        <path d="M307.5 150h-30c-8.284 0-15 6.716-15 15s6.716 15 15 15h30c8.284 0 15-6.716 15-15s-6.716-15-15-15z"></path>
        <path d="M172.5 90c8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15s-15 6.716-15 15v60c0 8.284 6.716 15 15 15z"></path>
        <path d="M172.501 240c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15v-60c0-8.284-6.716-15-15-15z"></path>
        <path d="M77.04 48.327c-5.856-5.858-15.354-5.857-21.213 0-5.858 5.858-5.858 15.355 0 21.213l42.427 42.428a14.954 14.954 0 0010.606 4.394c3.838 0 7.678-1.465 10.606-4.393 5.858-5.858 5.858-15.355 0-21.213L77.04 48.327z"></path>
        <path d="M246.746 218.034c-5.857-5.857-15.355-5.857-21.213 0-5.858 5.858-5.857 15.355 0 21.213l42.428 42.426a14.953 14.953 0 0010.607 4.393c3.839 0 7.678-1.465 10.606-4.393 5.858-5.858 5.858-15.355 0-21.213l-42.428-42.426z"></path>
        <path d="M98.254 218.034L55.828 260.46c-5.858 5.858-5.858 15.355 0 21.213a14.953 14.953 0 0010.607 4.393 14.95 14.95 0 0010.606-4.393l42.426-42.426c5.858-5.858 5.858-15.355 0-21.213-5.858-5.858-15.356-5.858-21.213 0z"></path>
      </g>
    </svg>
                   </div>

                   <div className="flex justify-center">
                   {children}
                   </div>

                    </div>

            </div>
    )
}
