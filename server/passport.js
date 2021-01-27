const passport = require('passport'),
JWTStrategy = require('passport-jwt').Strategy,
LocalStrategy = require('passport-local').Strategy,
GooglePlusTokenStrategy = require('passport-facebook-token'),
FacebookTokenStrategy = require('passport-facebook-token'),
config = require('./config'),
User = require('./models/users');

const cookieExtractor = req => {
    let token = null;
    if(req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}

// JWT Strategy
passport.use(new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true
}, async (req, payload, done) => {
    try{
        console.log(payload._id)
        const user = await User.findById(payload._id);
        if(!user) {
            return done(null, false);
        }

        req.user = user;
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {

        const user = await User.findByCredentials(email, password);
        if(!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));