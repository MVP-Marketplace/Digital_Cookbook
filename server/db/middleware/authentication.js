const passport = require('passport'),
jwt = require('jsonwebtoken'),
User = require('../models/users.models'),
JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

let jwtOptions = {
    jwtFromRequest: (req) => {
        if(!req.url.includes('/api')) {
        const token = jwt.sign({ react_app: true}, process.env.JWT_SECRET);
        return token;
    }

    return req.cookies.jwt || ExtractJwt.fromAuthHeaderWithScheme('jwt')(req);
},
    secretOrKey: process.env.JWT_SECRET
}

passport.use('jwt',
new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    if(jwtPayload.react_app) done(null, true);

    if(Date.now() > jwtPayload.expires) done(null, false, {message: 'jwt expired'})

    let {iat, exp, ...userData} = jwtPayload;
    userData = await User.findById(userData._id);
    return done(null, userData);
})
)

module.exports = passport