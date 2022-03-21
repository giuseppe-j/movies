import { useContext, useEffect, useState } from 'react';
import { FetchContext } from '../../context/context';
import useLazySearch from '../useLazySearch';


const SearchBox = ({setSearchValue}:any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm] = useLazySearch(searchTerm, 1000);
    const context:any = useContext(FetchContext);

    useEffect(() => {
        setSearchValue(debouncedTerm);
    },[debouncedTerm, setSearchValue]);

    const handleClick = () => {
        context.dispatch({type: 'CLEAR_LIST'});
        setSearchTerm('');
    }

	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
                placeholder="Search . . ."
                onChange={e => setSearchTerm(e.target.value)}
                value={searchTerm}/>
            <button className="button" onClick={handleClick}>x</button>
		</div>
	);
};

export default SearchBox;