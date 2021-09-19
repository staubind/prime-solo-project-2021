// import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ServingsModal from '../ServingsModal/ServingsModal';
import { useState } from 'react';
import FavoritesModal from '../FavoritesModal/FavoritesModal';
import { useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({recipe}) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(store => store.user)
  const [cartModalShow, setCartModalShow] = useState(false)
  const [servings, setServings] = useState(1)
  const [favoriteModalShow, setFavoriteModalShow] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            GG
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title={recipe.title}
        // subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={recipe.image}
        alt="Paella dish"
      />
      <CardContent>
        {/* This will be where we put the cooking time readiness */}
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
          {/* Ready in: {recipe.readyInMinutes}  other info??? */}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>

        {recipe.isCurrent ? 
        <IconButton onClick={() => {changeCart('remove')}}>
          <RemoveShoppingCartOutlinedIcon />
        </IconButton>
        :
        <IconButton onClick={() => {setCartModalShow(true)}}>
          <AddShoppingCartOutlinedIcon />
        </IconButton>
        }
        <ServingsModal 
            show={cartModalShow} 
            onHide={() => setCartModalShow(false)} 
            confirm={() => changeCart()}
            heading={recipe.title}
            setservings={setServings}
        />

        {recipe.isFavorite ?
            <IconButton variant="primary" onClick={() => {setFavoriteModalShow(true)}}>
                <FavoriteOutlinedIcon />
            </IconButton>
            :
            <IconButton variant="primary" onClick={() => {changeFavorite()}}>
                <FavoriteBorderOutlinedIcon />
            </IconButton>
        }
        <FavoritesModal 
            show={favoriteModalShow} 
            onHide={() => setFavoriteModalShow(false)} 
            confirm={() => changeFavorite()}
            heading={recipe.title}
        />



        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>


        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>

          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}




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
        type: 'SET_DETAIL_REDUCER',
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

// export default RecipeCard;