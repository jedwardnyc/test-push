const router = require('express').Router();
const GithubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

const host = process.env.HOST
const githubCredentials = {
  clientID: process.env.GIT_ID,
  clientSecret: process.env.GIT_KEY,
  callbackURL: `${host}/auth/github/callback`
}

const verificationCb = (token, refreshToken, profile, done) => {
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
  const token = jwt.sign({id: req.user.id}, process.env.SECRET, { expiresIn: 86400 })
  res.redirect(`/?token=${token}`)
}) 

module.exports = router;