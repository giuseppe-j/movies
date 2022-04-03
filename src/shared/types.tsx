import { Dispatch } from "react";
export interface State {
  movies: Movie[];
}

export type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

export type JsonData = {
  Response: string;
  Search: Movie[];
  totalResults: string;
};

export type AppContext = {
  state: State;
  dispatch: Dispatch<Action>;
};

// export type DispatchPayload = { type: string; payload: string };

export type Action =
  | { type: "LOAD_LIST"; payload: Movie[] }
  | { type: "CLEAR_LIST" };
