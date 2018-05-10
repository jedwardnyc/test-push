const router = require('express').Router();
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const { User } = require('../db/models/User');
const config = require('./config');


//change once deployed
const host = 'http://localhost:3000';
const fbCredentials = {
    clientID: config.fbId,
    clientSecret: config.fbKey,
    callbackURL: `${host}/auth/facebook/callback`
  };

const verificationCb = (token, refreshToken, profile, done) => {
  const info = {
    firstname: profile.name.givenName,
    lastname: profile.name.familyName,
    email: profile.emails[0].value
  };

  User.findOrCreate({
    where: { facebookId: profile.id },
    defaults: info
  })
  .spread((user, created) => {
    done(null, user);
  })
  .catch(done);
}

passport.use(new FacebookStrategy(fbCredentials, verificationCb))

router.get('/', passport.authenticate('facebook'));

router.get('/callback', passport.authenticate('facebook', { successRedirect:'/' ,failureRedirect: '/login' }))

module.exports = router;