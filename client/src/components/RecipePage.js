import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container";

const Recipe = () => {
        function List ({items, fallback}){
            if(items && items.length === undefined  ){
                return fallback
            }else{
                return (
                    items.map(item =>{
                        return <div>{item.name} 
                        
                        {item.amount.us.map(value =>{
                            
                        })}
                        
                        </div>
                    })


                )
            }
        }


    const [idData, setIdData] = useState([{}]);
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
        <div>
            <List items={idData}   fallback={'loading'}    />
                {console.log(idData)}
            {/* {idData && idData.length ?
            idData.map(value => (
                <h3>
                    {value.name}
                    {typeof (value.amount.us.unit) ? ' ' : 'one' }
                    {console.log(value.amount.us.unit)}
                </h3>
            )) 
            : 'ooooohhhh'  
        } */}
        </div>

        
    )
}

export default Recipe
