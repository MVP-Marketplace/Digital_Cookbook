import React , {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import SearchForm from './SearchForm'
import AllRecipies from './allRecipies'
const HomePage = () => {
    const [data, setData] = useState({recipe: []});
    const [search, setSearch] = useState("apple");
    useEffect(()=>{
        const getData = async () =>{
            const result = await axios.get(
                `/api/search/${search}`,
                ); setData({ recipe: result.data.results})
        }
        getData()
    }, [search]
    
)
    return (
        <Fragment>
             <SearchForm setSearch={setSearch} initialPlaceholder={search} />

             <AllRecipies data={data} />
        </Fragment>
         
    
    )
}

export default HomePage
