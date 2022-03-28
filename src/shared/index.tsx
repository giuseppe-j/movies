    type Movie = { Poster: string, Title: string, Type: string, Year: string, imdbID: string };
    
    export const fetchData = async (searchValue: string) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=11a308cd`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

    export const fetchDataFromLocalStorage = () => {
        const json = localStorage.getItem('react-movies') || '{}';
        return JSON.parse(json) || [];
    }

    export const saveToLocalStorage = (items : Movie[]) => {
        const json = localStorage.setItem('react-movies', JSON.stringify(items));
        return json;
    }