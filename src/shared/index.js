    export const fetchData = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=11a308cd`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

    export const fetchDataFromLocalStorage = () => {
        const json = localStorage.getItem('react-movies');
        return JSON.parse(json) || [];
    }

    export const saveToLocalStorage = (items) => {
        const json = localStorage.setItem('react-movies', JSON.stringify(items));
        return json;
    }