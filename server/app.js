const express = require('express'),
app = express(),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
cors = require('cors'),
mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/Digi-cookbook", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
app.use(morgan('dev'));
    
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}))



app.use(express.json());

app.use('/users', require('./routes/users'));

module.exports = app;