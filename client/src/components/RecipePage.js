import axios from 'axios';
import React, {useState, useEffect, Fragment} from 'react'
import { useParams } from 'react-router-dom';
import Card from './RecipeCard'
const Recipe = () => {
    const [idData, setIdData] = useState([]);
    let {id} = useParams();
    useEffect(()=>{
        const getData = async () =>{
            const result = await axios.get(
                `/api/id/${id}`
            ); 
            console.log(result.data.ingredients)    
            setIdData(result.data.ingredients)
        };
        getData()
    },[id]) 
    return (
        <Fragment>
            <Card items={idData}  />
        </Fragment>

        
    )
}

export default Recipe
