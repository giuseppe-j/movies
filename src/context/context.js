import {createContext, useReducer} from 'react';

export const FetchContext = createContext();

const INITIAL_STATE = { movies: []};

const themeReducer = (state, action) => {
    switch(action.type) {
        case "LOAD_LIST":
            return { movies: action.payload };
        case "CLEAR_LIST":
            return { movies: [] };
        default:
            return state;
    }
};

export const FetchProvider = (props) => {
    const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

    return (
        <FetchContext.Provider value={{state, dispatch}}>
            {props.children}
        </FetchContext.Provider>
    )
}