import React, {useState , useEffect} from 'react'
import uuid from 'react-uuid'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'


const FrontFood = () => {
    const [data, setData] = useState();
    useEffect(()=>{
        const getData = async () =>{
            const result = await axios.get(
                `/api/three`,
                ); setData(result.data.recipes)
        }
        getData()
    } , [] 
    )
    return (
        <CardDeck style={{ display:`flex`, justifyContent: 'space-around' }}>
               {data && data.length ? data.map(recipe =>(
                <Card  style={{ width: '4' }} key ={uuid()}>
                   <Card.Img variant="top" src={recipe.image} />
                   <Card.Body>
                     <Card.Title style={{fontSize : '0.8rem'}} >{recipe.title}</Card.Title>
                     <Card.Text style={{fontSize : '0.8rem'}}>
                     Lorem ipsum dolor sit amet
                     </Card.Text>
                   </Card.Body>
                 </Card>
      )): null }
        </CardDeck>
    )
}

export default FrontFood