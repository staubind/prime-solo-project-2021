import IngredientSection from "../IngredientSection/IngredientSection";

function IngredientList({ingredients}) {
    return (
        <>
        {/* // for each aisle: */}
        {Object.keys(ingredients).sort().map(aisle => {
            return (
                <>
                    <br></br>
                    <h2>{aisle}</h2>
                    <br></br>
                    <IngredientSection aisleIngredients={Array.from(ingredients[aisle]).sort()}/>
                </>
            );// list of ingredientSections
        })}  
        </>      
    );
};

export default IngredientList;