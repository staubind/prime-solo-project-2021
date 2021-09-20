import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import { Container, Row } from 'react-bootstrap';
// uses the navbar search utility
import RecipeReviewCard from '../RecipeCard/RecipeCard2'
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
            <br></br>
            { searchTerm ? <h1>{searchTerm}</h1> : <h1>Try Searching for new recipes!</h1>}
            <hr></hr>
            {searchResults.map(recipe => {
                return <div><RecipeReviewCard key={recipe.id} recipe={recipe}/><br></br></div>
            })}
            {/* </Row>
        </Container> */}
            
        </center>
    );
}; 

export default Search 