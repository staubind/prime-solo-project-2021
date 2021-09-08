import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// uses the navbar search utility

function Search() {
    const searchResults = useSelector(store => store.search);     

    // just returns the recipe cards
    return (
        <>
            
        </>
    );
}; 

export default Search 