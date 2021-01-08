if(process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express'),
app = express(),
cookieParser = require('cookie-parser'),
path = require('path'),
morgan = require('morgan'),
cors = require('cors');

app.use(express.json());

if(process.env.NODE_ENV !== 'production') app.use(express.static(path.join(__dirname, '../client/build')))
app.use(cookieParser());
app.use(openRoute);

app.use(
    passport.authenticate('googleToken', {
        session: false,
    })
);
const googleOAuth = require('./db/route/secure/GoogleOAuth');
app.use(googleOAuth);

app.use(
    passport.authenticate('jwt' ,{
        session: false,
    })
);

app.use(userRoute)  

if(process.env.NODE_ENV !== 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
    })
}

module.exports = app;