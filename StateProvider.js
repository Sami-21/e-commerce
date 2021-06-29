import React, {createContext, useContext, useReducer } from "react";
 
//making a Data Layer 
export const StateContext = createContext();

//Wrapping the web app and providing the Data Layer
export const StateProvider = ({ reducer, initialState,children}) =>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//Pulling informations from Data Layer
export const useStateValue = () => useContext(StateContext);
