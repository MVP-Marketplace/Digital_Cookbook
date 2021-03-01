const axios = require('axios');

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
        let cacheData
        let cacheTime
        let catcheEx 
        if(cacheTime && cacheTime > Date.now() - 30*8640000){
            return res.json(cacheData)
        }
        const url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONAPIKEY}&number=1&tag=maincourse`
        try{
            const {data} = await axios.get(
                url    
            )

            cacheData = data
            cacheTime = Date.now()
            catcheEx = cacheTime - 30*159400
            data.cacheTime = cacheTime
            data.catcheEx = catcheEx
            return res.json(data)
        }
        catch(error){
            return next(error)
        }
    } ,
    randomRecipesThree : async (req,res,next) =>{
        let cacheData
        let cacheTime
        let catcheEx 
        if(cacheTime && cacheTime > Date.now() - 30*8640000){
            return res.json(cacheData)
        }
        const url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONAPIKEY}&number=3&tag=maincourse`
        try{
            const {data} = await axios.get(
                url    
            )

            cacheData = data
            cacheTime = Date.now()
            catcheEx = cacheTime - 30*159400
            data.cacheTime = cacheTime
            data.catcheEx = catcheEx
            return res.json(data)
        }
        catch(error){
            return next(error)
        }
    } 
}