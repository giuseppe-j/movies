import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import Heading from "./components/heading/Heading";
import MoviesList from "./components/movieList/MovieList";
import SearchBox from "./components/searchBox/searchBox";
import { FetchContext } from "./context/context";
import {
  fetchData,
  fetchDataFromLocalStorage,
  saveToLocalStorage,
} from "./shared";
import * as Types from "./shared/types";

const App = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [favourites, setFavourites] = useState<Types.Movie[]>([]);

  const context: Types.AppContext = useContext(FetchContext);
  const movies = context.state.movies;

  useEffect(() => {
    if (searchValue) {
      const fetch = async (searchValue: string) => {
        const json: Types.JsonData = await fetchData(searchValue);
        if (json.Search) {
          context.dispatch({
            type: "LOAD_LIST",
            payload: json.Search,
          });
        }
      };
      fetch(searchValue);
    } else {
      context.dispatch({ type: "CLEAR_LIST" });
    }
  }, [searchValue]);

  useEffect(() => {
    const fetchFromLocalStorage = async () => {
      const favourites = fetchDataFromLocalStorage();
      setFavourites(favourites);
    };
    fetchFromLocalStorage();
  }, []);

  const addFavouriteMovie = (movie: Types.Movie) => {
    const hasMovie = favourites.filter(
      (favourite: Types.Movie) => favourite.imdbID === movie.imdbID
    ).length;
    if (!hasMovie) {
      const newFavourites = [...favourites, movie];
      setFavourites(newFavourites);
      saveToLocalStorage(newFavourites);
    }
  };

  const removeFavouriteMovie = (movie: Types.Movie) => {
    const newFavourites = favourites.filter(
      (favourite: Types.Movie) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites);
  };

  return (
    <div className={`container-fluid movies`}>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Heading heading="Movies" />
        <SearchBox setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MoviesList
          movies={movies}
          addFavourite={true}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Heading heading="Favourites" />
      </div>
      <div className="row">
        <MoviesList
          movies={favourites}
          addFavourite={false}
          handleFavouritesClick={removeFavouriteMovie}
        />
      </div>
    </div>
  );
};

export default App;
