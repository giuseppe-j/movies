import './movieList.css'
import AddFavourite from '../addFavourite/AddFavourite';
import RemoveFavourite from '../removeFavourite/RemoveFavourite';

type Movie = { Poster: string, Title: string, Type: string, Year: string, imdbID: string };

type Props = {
    movies: Movie[], 
    addFavourite: boolean,
    handleFavouritesClick: (movie: Movie) => void
};

const MoviesList = (props:Props) => {
    return (
    <div className="scrolling-wrapper">
        { 
        props.movies && props.movies.map((movie: Movie, index: number) => {
            return (
                <div key={index} className="card">
                    <img src={movie.Poster} alt={movie.Title}></img>
                    <div className='overlay d-flex align-items-center justify-content-center'>
                        { props.addFavourite ? 
                            <AddFavourite onFavouriteClick = {() => props.handleFavouritesClick(movie)} /> : 
                            <RemoveFavourite onFavouriteClick = {() => props.handleFavouritesClick(movie)} />
                        }
					</div>
                </div>
            )
        }) }
    </div>
    )
}

export default MoviesList;