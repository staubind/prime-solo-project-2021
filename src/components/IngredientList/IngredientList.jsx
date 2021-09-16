import IngredientSection from "../IngredientSection/IngredientSection";

function IngredientList({ingredients}) {
    return (
        <>
        {/* // for each aisle: */}
        {Object.keys(ingredients).sort().map(aisle => {
            return (
                <IngredientSection aisleIngredients={Array.from(ingredients[aisle]).sort()}/>
            );// list of ingredientSections
        })}  
        </>      
    );
};

export default IngredientList;