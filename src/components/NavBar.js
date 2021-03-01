import React , {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import AllRecipies from './allRecipies'
import NavMenu from './NavMenu'
const NavBar = () => {
    const [data, setData] = useState({recipe: []});
    const [search, setSearch] = useState();
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
    <>
        <Fragment>
             <NavMenu setSearch={setSearch} initialPlaceholder={search} />
             <AllRecipies data={data} />
        </Fragment>
        
    </>
    
    )
}

export default NavBar