import { useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function DetailView() {
    const recipe = useSelector(state => state.detailReducer)

    // useEffect(() => {
    //     console.log(recipe);
    // },[])

    return (
        <>
        <img src={recipe.image} />
        <h2>{recipe.name}</h2>
        <h4>Ready in: {recipe.readyInMinutes}</h4>
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Instructions</Accordion.Header>
                <Accordion.Body>
                    <ul>
                    {/* {recipe.analyzedInstructions.steps.map(step => <li>{step.step}</li>)} 
                        recipe.analyzedInstructions is itself a list of objects => like major steps
                    */}

                    {/* WHY THE FUCK WON'T THIS RENDER, IT'S A FUCKING LIST JUST MAP FOR CHRIST'S SAKE */}
                    {recipe.analyzedInstructions.map((majorStep, i) => {
                        return (
                            <li>
                                <h1>Part {i+1}</h1>
                                <ol>
                                    {majorStep.steps.map(step => <li>{step.step}</li>)}
                                </ol>
                            </li>
                        );
                    })}
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Ingredients</Accordion.Header>
                <Accordion.Body>
                    <ul>
                        {recipe.extendedIngredients.map(ingredient => <li>{ingredient.name}</li>)}
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
       
        </>
    );
};

export default DetailView;