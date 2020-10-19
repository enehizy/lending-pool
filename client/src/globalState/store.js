import React from 'react'
export const StoreContext=React.createContext();

export function StoreProvider({children}) {
    const State={
        unConfirmedTx:0,
        txSent:false,
        error:false
        
    }

    return (
        <StoreContext.Provider value={{...State}}>
            {children}
        </StoreContext.Provider>
    )
}
