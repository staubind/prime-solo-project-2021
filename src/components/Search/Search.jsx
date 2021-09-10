import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
// uses the navbar search utility

function Search() {
    const searchResults = useSelector(store => store.search);     
    const searchTerm = useSelector(store => store.searchTermReducer);
    // useEffect({
    //     // display what's currently in store from last search
    // },[])

    // just returns the recipe cards
    return (
        <>
            <h1>Showing results for: {searchTerm}</h1>
            {searchResults.map(recipe => {
                return <RecipeCard key={recipe.id} recipe={recipe}/>
            })}
        </>
    );
}; 

export default Search 