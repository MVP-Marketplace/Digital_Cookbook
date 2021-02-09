const passport = require('passport'),
JWTStrategy = require('passport-jwt').Strategy,
LocalStrategy = require('passport-local').Strategy,
GooglePlusTokenStrategy = require('passport-google-plus-token'),
FacebookTokenStrategy = require('passport-facebook-token'),
config = require('./config/index'),
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
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.FACEBOOKAPPID,
    clientSecret: process.env.FACEBOOKAPPSECRETE,
    passReqToCallback: true
    },
    async(req, accessToken, refreshToken, profile, done)=>{
        try {
            console.log('profile', profile);
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            
            if (req.user) {
              req.user.methods.push('facebook')
              req.user.facebook = {
                id: profile.id,
                email: profile.emails[0].value
              }
              await req.user.save();
              return done(null, req.user);
            } else {
              let existingUser = await User.findOne({ "facebook.id": profile.id });
              if (existingUser) {
                return done(null, existingUser);
              }
              existingUser = await User.findOne({ "local.email": profile.emails[0].value })
              if (existingUser) {
                existingUser.methods.push('facebook')
                existingUser.facebook = {
                  id: profile.id,
                  email: profile.emails[0].value
                }
                await existingUser.save()
                return done(null, existingUser);
              }
        
              const newUser = new User({
                methods: ['facebook'],
                facebook: {
                  id: profile.id,
                  email: profile.emails[0].value,
                  name: profile.displayName
                }
              });
              await newUser.save();
              done(null, newUser);
            }
          } catch(error) {
            done(error, false, error.message);
          }
        }

    )
)
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLECLIENTID,
    clientSecret: process.env.GOOGLECLIENTSECRET,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done)=>{
    
    try{
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        if(req.user){
            req.user.method.push('google')
            req.user.google ={
                id: profile.id,
                email: profile.emails[0].value,
            }
            await req.user.save()
            return done(null, req.user)
        } else {
            let existingUser = await User.findOne({ "google.id": profile.id });
            if (existingUser) {
              return done(null, existingUser);
                }
            }
                  existingUser = await User.findOne({ "local.email": profile.emails[0].value })
      if (existingUser) {
        existingUser.methods.push('google')
        existingUser.google = {
          id: profile.id,
          email: profile.emails[0]
        }
        await existingUser.save()
        return done(null, existingUser);
      }
            const newUser = new User({
                methods: ['google'],
                google:{
                    id: profile.id,
                    email: profile.emails[0].value,
                    name: profile.name.givenName,
                }
            })
            await newUser.save();
            done(null, newUser)
    }
    catch(error){
        done(error,false, error.message)
    }
})),
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
}))
