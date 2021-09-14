import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeCard from '../RecipeCard/RecipeCard';

function Favorites() {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favoriteReducer);
    // on load: get all favorites for the user

    useEffect(() => {
        // if we do this on load, everytime they go to the page it'll run all of the api calls
        // need a different solution to avoid unnecessary api calls
        // on each call to favorites:
                // we'll send the list from the front end of what's currently in favorites reducer.
                // check for differences between f.e.state and database
                // only do an api call for the difference to minimize api point impact
                // then send result to favorites
                // rerender the component

        dispatch({
            type: 'FETCH_ALL_FAVORITES',
            payload: []
        })
    }, [])

    // display the list of recipe cards in return
    return (
        <>
            {favorites.map(recipe => {
                return <RecipeCard key={recipe.id} recipe={recipe}/>
            })}       
        </>
    );
}

export default Favorites;