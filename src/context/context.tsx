import { createContext, useReducer } from "react";
import { Action, AppContext, State } from "../shared/types";

const INITIAL_STATE: State = { movies: [] };

export const FetchContext = createContext<AppContext>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const themeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOAD_LIST":
      return { movies: action.payload };
    case "CLEAR_LIST":
      return { movies: [] };
    default:
      return state;
  }
};

export const FetchProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

  return (
    <FetchContext.Provider value={{ state, dispatch }}>
      {children}
    </FetchContext.Provider>
  );
};
