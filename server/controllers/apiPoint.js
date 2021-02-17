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