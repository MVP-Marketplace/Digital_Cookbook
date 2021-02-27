const axios = require('axios');
let cacheData
module.exports = {
    complexSearch : async (req,res,next) =>{
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONAPIKEY}`
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
    },
    recipieID : async (req,res,next) =>{
        const id = req.params['id']
        const url = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.SPOONAPIKEY}`
        try{
            const {data} = await axios.get(
                url,{
                    params:{
                        id: id
                    }
                }
            )
            return res.json(data)
        }
        catch(error){
            return next(error)
        }
    }
}