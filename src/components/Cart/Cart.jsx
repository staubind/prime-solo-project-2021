import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeCard from '../RecipeCard/RecipeCard';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer);
    // on load: get all favorites for the user

    useEffect(() => {
        dispatch({
            type: 'FETCH_CART',
            payload: []
        })
    }, [])

    // display the list of recipe cards in return
    return (
        <>
            {cart.map(recipe => {
                return <RecipeCard key={recipe.id} recipe={recipe}/>
            })}       
        </>
    );
}

export default Cart;