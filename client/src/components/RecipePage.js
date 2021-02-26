import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container";

const Recipe = () => {
    const [idData, setIdData] = useState({});
    let {id} = useParams();
    useEffect(()=>{
        const getData = async () =>{
            const result = await axios.get(
                `/api/id/${id}`
            );
            setIdData(result.data.ingredients)
           
        };
        getData()
        
    },[id])
    return (
        <Container>
            <div>
                    <h3>
                        {console.log(idData)}
                        {idData.name}
                    </h3>      
                        <img src={idData.image} />
            </div>
        </Container>
    )
}

export default Recipe
