import React from 'react'
import Container from "react-bootstrap/Container";
import uuid from 'react-uuid'
const RecipeCard = ({items}) => {
    return (
      <Container>
        <ul className="list-group list-group-flush">
            {items && items.length 
            ? items.map(item =>(
                <li className="list-group-item" key={uuid()} >
                    <p> {item.amount.us.value} {item.amount.us.unit} {item.name}</p>
                    <img src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`} /> 
                </li>
            )) : '' }

        </ul>
     </Container>   
    )
}

export default RecipeCard
