import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeCard from '../RecipeCard/RecipeCard';
import { Tabs, Tab, Container } from "react-bootstrap";
import IngredientList from "../IngredientList/IngredientList";

// this gathers the ingredients for the recipe display
function makeGroceryList(recipes) {
    let totalIngredients = {};
    // need recipe list 
    // also need servings per recipe
    for (let recipe of recipes) {
        for (let ingredient of recipe.extendedIngredients) {
                if (totalIngredients[ingredient.aisle] === undefined) {
                    totalIngredients[ingredient.aisle] = new Set();
                    totalIngredients[ingredient.aisle].add(ingredient.name)
                } else {
                    totalIngredients[ingredient.aisle].add(ingredient.name)
                }
            }
        }
    return totalIngredients
}

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
        <Container>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Recipes">
                    {cart.map(recipe => {
                        return <RecipeCard key={recipe.id} recipe={recipe}/>
                    })}
                </Tab>
                <Tab eventKey="profile" title="Grocery List">
                    <IngredientList ingredients={makeGroceryList(cart)}/>
                </Tab>
            </Tabs>        
        </Container>
    );
}

export default Cart;