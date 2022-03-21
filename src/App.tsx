import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { useEffect, useState, useContext } from 'react';
import MoviesList from './components/movieList/MovieList';
import Heading from "./components/heading/Heading";
import SearchBox from "./components/searchBox/searchBox";
import { FetchContext } from "./context/context";
import { fetchData, fetchDataFromLocalStorage, saveToLocalStorage } from "./shared";

const App = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [favourites, setFavourites] = useState<any[]>([]);

  const context:any = useContext(FetchContext);
  const movies = context.state.movies;

  useEffect(() => {
    const fetch = async (searchValue:string) => {
      const json = await fetchData(searchValue).catch(console.error);
      if (json.Search) {
        context.dispatch({
          type: 'LOAD_LIST',
          payload: json.Search
        });
      }
    }
    fetch(searchValue);
  }, [searchValue])
  

  useEffect(() => {
    const fetchFromLocalStorage = async () => {
      const favourites = fetchDataFromLocalStorage();
      setFavourites(favourites);
    }
    fetchFromLocalStorage();
  }, [])

  const addFavouriteMovie = (movie:any) => {
    // const newFavourites = favourites.filter((favourite:any) => favourite.imdbID === movie.imdbID);
    const hasMovie = favourites.filter((fav:any) => fav.imdbID === movie.imdbID).length;
    if (!hasMovie) {
      const newFavourites = [...favourites, movie];
      setFavourites(newFavourites);
      saveToLocalStorage(newFavourites);
    }
  }
  
  const removeFavouriteMovie = (movie:any) => {
    const newFavourites = favourites.filter((favourite:any) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavourites);
    saveToLocalStorage(newFavourites);
  }
  
  return ( 
    <div className={`container-fluid movies`}>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<Heading heading='Movies' />
				<SearchBox setSearchValue={setSearchValue}/>
			</div>
      <div className="row">
        <MoviesList 
          movies={movies} 
          addFavourite= {true}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<Heading heading='Favourites' />
			</div>
			<div className='row'>
				<MoviesList 
          movies={favourites} 
          addFavourite= {false}
          handleFavouritesClick={removeFavouriteMovie} 
        />
			</div>
    </div>
  );
}

export default App;