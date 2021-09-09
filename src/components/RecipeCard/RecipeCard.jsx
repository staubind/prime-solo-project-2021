import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
function RecipeCard({recipe}) {

    return (
        <>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>
                  {recipe.title}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
        </>
    );
};

export default RecipeCard;