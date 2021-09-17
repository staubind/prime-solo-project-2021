import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import { Container, Row } from 'react-bootstrap';
// uses the navbar search utility

function Search() {
    const searchResults = useSelector(store => store.search);     
    const searchTerm = useSelector(store => store.searchTermReducer);
    // useEffect({
    //     // display what's currently in store from last search
    // },[])

    // just returns the recipe cards
    return (
        <center>
        {/* // <Container>
        //     <Row className="justify-content-md-center"> */}
            <h1>Showing results for: {searchTerm}</h1>
            {searchResults.map(recipe => {
                return <RecipeCard key={recipe.id} recipe={recipe}/>
            })}
            {/* </Row>
        </Container> */}
        </center>
    );
}; 

export default Search 