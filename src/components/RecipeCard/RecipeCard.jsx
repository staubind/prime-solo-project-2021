import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ServingsModal from '../Modal/Modal';
import { useState } from 'react';

function RecipeCard({recipe}) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)
    const [modalShow, setModalShow] = useState(false)
    const [servings, setServings] = useState(1)

    const changeCart = (val) => {
        // defaults to adding to the cart
        console.log('servings is: ', servings);
        let type = 'ADD_TO_CART'
        if (val === 'remove') {
            type = 'REMOVE_FROM_CART'
        }
        // send the id to our saga
        dispatch({
            type: type,
            payload: {recipeId: recipe.id, userId: user.id, servings: servings}
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
                <Button variant="primary" onClick={() => {setModalShow(true)}}>Add to Cart</Button>
                <Button variant="primary" onClick={() => {changeCart('remove')}}>Remove from Cart</Button>
                <ServingsModal 
                  show={modalShow} 
                  onHide={() => setModalShow(false)} 
                  confirm={() => changeCart()}
                  heading={recipe.title}
                  setservings={setServings}
                />
              </Card.Body>
            </Card>
        </>
    );
};

export default RecipeCard;