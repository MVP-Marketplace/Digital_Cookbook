const express = require('express'),
router = require('express-promise-router')(),
passport = require('passport'),
passportConf = require('../passport');

const {validateBody, schemas} = require('../helpers/routeHelper');
const UserController = require('../controllers/user');
const passportSignIn = passport.authenticate('local', {session: false});
const passportJWT = passport.authenticate('jwt', {session: false});

router.route('/signup')
.post(validateBody(schemas.authSchema), UserController.signUp);
router.route('/oauth/google')
.post(passport.authenticate('googleToken', {session: false}), UserController.googleOauth)
router.route('/oauth/facebook')
.post(passport.authenticate('facebookToken', {session: false}), UserController.facebookOauth)
router.route('/signin')
.post(validateBody(schemas.authSchema), passportSignIn, UserController.signIn);
router.route('/signout')
.get(passportJWT, UserController.signOut);

module.exports = router;