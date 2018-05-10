const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const config = require('./config');
const User = require('../db/models/User');

const host = 'http://localhost:3000'
const googleCredentials = {
  clientID: config.googId,
  clientSecret: config.googKey,
  callbackURL: `${host}/auth/google/callback`
}


const verificationCb = (token, refreshToken, profile, done) => {
  const info = {
    firstname: profile.name.givenName,
    lastname: profile.name.familyName,
    email: profile.emails[0].value,
  };

  User.findOrCreate({
    where: { googleId: profile.id },
    defaults: info
  })
  .spread((user, created) => {
      done(null, user);
  })
  .catch(done);
}

passport.use(new GoogleStrategy(googleCredentials, verificationCb));

router.get('/', passport.authenticate('google', { scope: 'email' }))

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/')
}) 

module.exports = router;
