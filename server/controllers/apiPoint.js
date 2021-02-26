const axios = require('axios')

let cachedData;
let cacheTime;
module.exports = {
    complexSearch : async (req,res,next) =>{
        if(cacheTime && cacheTime > Date.now() - 30*1000){
            return res.json(cachedData)
        }
            try{
                const {data} = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONAPIKEY}`)
                cachedData = data;
                cacheTime = Date.now()
                data.cacheTime = cacheTime
                return res.json(data)
            }
            catch(error){
               return  next(error)
            }
        }
    }