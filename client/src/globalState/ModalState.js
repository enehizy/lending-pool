import React,{useContext, useReducer} from 'react'


const State={
    show:false,
    modalChild:"tx"
}
export const ModalContext =React.createContext(undefined);
const Reducer=(state,action)=>{
    if(action.type == "close"){
      return {
         show:false,
         modalChild:'tx'
      };
    }
    if(action.type="open-tx"){
        return {
            show:true,
            modalChild:'tx'
         };
    }
    return state;

}

export default function ModalState({children}){
    const [state,dispatch] =useReducer(Reducer,State);
    return(
        <ModalContext.Provider value={{state,dispatch}}>
            {children}
        </ModalContext.Provider>
    )

}