const axios = require('axios');
const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONAPIKEY}`
let cacheData
module.exports = {
    complexSearch : async (req,res,next) =>{

        const queryData = req.params['query']
            try{
                const {data} = await axios.get(
                    url,{
                        params:{
                            query: queryData
                        }
                    }                   
                )
                cacheData = data
                return res.json(data)
            }
            catch(error){
               return  next(error)  
        }
    }
}