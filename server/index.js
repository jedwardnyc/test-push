const config = require('../server/auth/config');
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');

const volleyball = require('volleyball');
const path = require('path');
const User = require('./db/models/User');

app.use(session({
  secret: config.secret,
})); 

app.use(passport.initialize());
app.use(passport.session()); 

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      done(null, user);
    })
    .catch(done);
});

app.use(volleyball);
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/api', require('./routes'));
app.use('/auth', require('./auth'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.log(`*** There is an error! ${err.stack} ***`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));


