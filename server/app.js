require('./db/config');
if(process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express'),
app = express(),
cookieParser = require('cookie-parser'),
openRoute = require('./route/open/index'),
passport = require('./db/middleware/authentication'),
path = require('path');

app.use(express.json());

if(process.env.NODE_ENV !== 'production') app.use(express.static(path.join(__dirname, '../client/build')))

app.use(cookieParser());
app.use(openRoute);

app.use(
    passport.authenticate('jwt' ,{
        session: false,
    })
);

if(process.env.NODE_ENV !== 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
    })
}

module.exports = app;