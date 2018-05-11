const router = require('express').Router();
const GithubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const config = require('./config');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

const host = 'http://localhost:3000'
const githubCredentials = {
  clientID: config.gitId,
  clientSecret: config.gitKey,
  callbackURL: `${host}/auth/github/callback`
}

const verificationCb = (token, refreshToken, profile, done) => {
  console.log(profile)
  const info = {
    firstname: profile.displayName.split(' ')[0],
    lastname: profile.displayName.split(' ')[1],
    email: profile.emails[0].value,
  };

  User.findOrCreate({
    where: { githubId: profile.id },
    defaults: info
  })
  .spread((user, created) => {
      done(null, user);
  })
  .catch(done);
}

passport.use(new GithubStrategy(githubCredentials, verificationCb));

router.get('/', passport.authenticate('github', { session: false }))

router.get('/callback', passport.authenticate('github', { failureRedirect: '/login', session: false }), (req, res) => {
  const token = jwt.sign({id: req.user.id}, config.secret, { expiresIn: 86400 })
  res.redirect(`/?token=${token}`)
}) 

module.exports = router;