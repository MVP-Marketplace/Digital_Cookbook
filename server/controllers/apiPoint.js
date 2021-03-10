const axios = require('axios')
const moment = require('moment')
let cachedData;
let cacheTime;
module.exports = {
    complexSearch : async (req,res,next) =>{
        if(cacheTime && cacheTime > moment() - 30*1000){
            return res.json(cachedData)
        }
            try{
                const {data} = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONAPIKEY}`)
                cachedData = data;
                cacheTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
                data.cacheTime = cacheTime
                return res.json(data)
            }
            catch(error){
               return  next(error)
            }
        }
    }


/*Search Recipes by Ingredients
ex: 
https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2
*/

const getrecipebyIngredients = async (request, response) =>{
    try{
        //right it accpets a maximum of three ingredients and return up to 2 pages of recipes
        const { ingredientOne } = request.query;
        const { ingredientTwo } = request.query;
        const { ingredientThree } = request.query;

        const recipeList = await axios.get(`
        https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientOne},+${ingredientTwo},+${ingredientThree}&number=2
        `)

        response.json({ data: recipeList.data })

    }catch(e){
        res.status(400).json({ error: e.toString() });
    }
}

module.exports = {
    getrecipebyIngredients
}