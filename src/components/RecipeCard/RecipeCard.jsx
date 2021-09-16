import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ServingsModal from '../ServingsModal/ServingsModal';
import { useState } from 'react';
import FavoritesModal from '../FavoritesModal/FavoritesModal';
import { useHistory } from 'react-router-dom';

function RecipeCard({recipe}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user)
    const [cartModalShow, setCartModalShow] = useState(false)
    const [servings, setServings] = useState(1)
    const [favoriteModalShow, setFavoriteModalShow] = useState(false);

    const changeCart = (val) => {
        // defaults to adding to the cart
        let type = 'ADD_TO_CART'
        if (val === 'remove') {
            type = 'REMOVE_FROM_CART'
        }
        // send the id to our saga
        dispatch({
            type: type,
            payload: {recipeId: recipe.id, userId: user.id, servings: servings}
        })
        // could dispatch to the cart reducer and just add it there
    }

    const changeFavorite = () => {
      dispatch({
        type: 'CHANGE_RECIPE_FAVORITE',
        payload: {recipeId: recipe.id, userId: user.id}
      })
    }

    const launchDetailView = () => {
      dispatch({
        type: 'UPDATE_DETAIL_REDUCER',
        payload: recipe
      })
      history.push('/detail')
    }

    return (
        <>
            <Card style={{ width: '18rem' }}>
              <Card.Img onClick={() => launchDetailView()} variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title>{recipe.title} {recipe.id}</Card.Title>
                <Card.Text>
                  {recipe.title}
                </Card.Text>
                  {/* time for conditional button rendering. Hell yeah. */}
                {recipe.isCurrent ?
                  <Button variant="primary" onClick={() => {changeCart('remove')}}>Remove from Cart</Button>
                :
                <Button variant="primary" onClick={() => {setCartModalShow(true)}}>Add to Cart</Button>
                }
                <ServingsModal 
                  show={cartModalShow} 
                  onHide={() => setCartModalShow(false)} 
                  confirm={() => changeCart()}
                  heading={recipe.title}
                  setservings={setServings}
                />
                {recipe.isFavorite ?
                  <Button variant="primary" onClick={() => {setFavoriteModalShow(true)}}>Remove from Favorites</Button>
                :
                <Button variant="primary" onClick={() => {changeFavorite()}}>Add to Favorites</Button>
                }
                <FavoritesModal 
                  show={favoriteModalShow} 
                  onHide={() => setFavoriteModalShow(false)} 
                  confirm={() => changeFavorite()}
                  heading={recipe.title}
                />


              </Card.Body>
            </Card>
        </>
    );
};

export default RecipeCard;