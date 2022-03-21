import {createContext, useReducer} from 'react';

const INITIAL_STATE = { movies: []};
export const FetchContext = createContext({state:INITIAL_STATE, dispatch:{}});

const themeReducer = (state:any, action:any) => {
    switch(action.type) {
        case "LOAD_LIST":
            return { movies: action.payload };
        case "CLEAR_LIST":
            return { movies: [] };
        default:
            return state;
    }
};

export const FetchProvider = (props:any) => {
    const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

    return (
        <FetchContext.Provider value={{state, dispatch}}>
            {props.children}
        </FetchContext.Provider>
    )
}