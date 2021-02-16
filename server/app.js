const express = require('express')
const axios = require('axios');
  app = express(),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  cors = require('cors'),
mongoose = require('mongoose');

app.use('/axiosget', async function (req, res , next) {
  try{
    const {
      data 
    } = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONAPIKEY}`
    )
    let result = data.results
    res.send(result)
  }catch(e){
    console.log(e)
    res.status(500)
  }
  next()
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log('connected to db'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5000',
    credentials: true,
  }),
);

app.use(express.json());

app.use('/users', require('./routes/users'));
module.exports = app;
