import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function RecipeCard({recipe}) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)

    const changeCart = (val) => {
        // defaults to adding to the cart
        const type = 'ADD_TO_CART'
        if (val === 'remove') {
            type = 'REMOVE_FROM_CART'
        }
        // send the id to our saga
        dispatch({
            type: type,
            payload: {recipeId: recipe.id, userId: user.id}
        })
    }

    return (
        <>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title>{recipe.title} {recipe.id}</Card.Title>
                <Card.Text>
                  {recipe.title}
                </Card.Text>
                <Button variant="primary" onClick={() => {changeCart()}}>Add to Cart</Button>
              </Card.Body>
            </Card>
        </>
    );
};

export default RecipeCard;