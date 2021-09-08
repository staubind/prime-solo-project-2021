import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
// uses the navbar search utility

function Search() {
    const searchResults = useSelector(store => store.search);     

    // just returns the recipe cards
    return (
        <>
            {searchResults.map(recipe => {
                return <RecipeCard recipe={recipe}/>
            })}
        </>
    );
}; 

export default Search 