const express = require('express')
const axios = require('axios')
require('dotenv')


module.exports = async function(){
   await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONAPIKEY}`)
   .then(res =>{
       console.log(res.data.results)
   })
}




