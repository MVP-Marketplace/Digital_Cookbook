const axios = require('axios');
let cacheData
module.exports = {
    complexSearch : async (req,res,next) =>{
        const search = req.params['search']
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=${process.env.SPOONAPIKEY}`
        
            try{
                const {data} = await axios.get(
                    url,{
                        params:{
                            query: search
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
    },
    randomRecipes : async (req,res,next) =>{
        const url = `https://api.spoonacular.com/recipes/random?${process.env.SPOONAPIKEY}`
        try{
            const {data} = await axios.get(
                url
                
            )
            return res.json(data)
        }
        catch(error){
            return next(error)
        }
        
    }