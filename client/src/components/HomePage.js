import React, {useState , useEffect} from 'react'
import uuid from 'react-uuid'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import FrontFood from './frontFood'
import Container from 'react-bootstrap/Container'
const HomePage = () => {
  const [data, setData] = useState();
    useEffect(()=>{
        const getData = async () =>{
            const result = await axios.get(
                `/api/random`,
                ); setData(result.data.recipes)
        }
        getData()
    } , [] 
    
)

    return (
      <Container>
        {data && data.length ? data.map(recipe =>(
    <Card className="bg-dark text-white" key={uuid()}  >
    <Card.Img src={recipe.image} alt="Card image" height="450px" />
        <Card.ImgOverlay>
            <h1>
              This week's Featured Meal
            </h1>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Button variant="warning" href={`/recipe/${recipe.id}`}>Start Cooking</Button>
           
           
                    <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Card.Text>
             </Card.ImgOverlay>
       </Card>

      )): null }
        <h2>What else is cooking ?</h2>
        <FrontFood />
    </Container>
    )
}

export default HomePage
