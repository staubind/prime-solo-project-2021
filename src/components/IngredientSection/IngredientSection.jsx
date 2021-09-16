import { Form } from 'react-bootstrap'

function IngredientSection({aisleIngredients}) {
    return (
        <Form>
        {/* // for each section */}
        {aisleIngredients.map(ingredient => <Form.Check label={ingredient} />)}
            {/* // convert the set to an array, then sort it
            // print out a sorted list
            // with checkboxes - checkboxes should gray the text */}
        </Form>
    );
};

export default IngredientSection;