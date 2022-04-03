import * as Types from "./types";

export const fetchData = async (searchValue: string) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=11a308cd`;
  const response = await fetch(url);
  const json: Types.JsonData = await response.json();
  return json;
};

export const fetchDataFromLocalStorage = () => {
  const json: string = localStorage.getItem("react-movies") || "{}";
  return JSON.parse(json) || [];
};

export const saveToLocalStorage = (items: Types.Movie[]) => {
  const json: void = localStorage.setItem(
    "react-movies",
    JSON.stringify(items)
  );
  return json;
};
